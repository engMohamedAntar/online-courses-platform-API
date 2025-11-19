//auth.service.ts
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { NotificationsService } from '../notifications/notifications.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private notificationService: NotificationsService,
  ) {}

  async register(body: RegisterDto): Promise<UserResponseDto> {
    const hash = await bcrypt.hash(body.password, 10);
    const user = this.userRepo.create({
      ...body,
      password: hash,
    });
    await this.userRepo.save(user);

    //create jwtToken
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return new UserResponseDto(user, token);
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_JWT_EXPIRE_IN'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }

  refreshToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) {
      return user;
    }
    return await this.userService.createUser(googleUser);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;
    return data;
  }

  async forgotPassword(user: any) {
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');
    user.resetCode = hashedResetCode;
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await this.notificationService.sendMail({
      to: user.email,
      subject: `Reset Code`,
      message: `Reset Code is: ${resetCode}`,
    });
    await this.userRepo.save(user);
    return `Reset Code sent to ${user.email}`;
  }

  async verifyResetCode(user: any, resetCode: string) {
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');
    console.log(user.resetCode);
    console.log(hashedResetCode);
    
    const res = await this.userRepo.findOne({
      where: {
        id: user.id,
        resetCode: hashedResetCode,
        resetCodeExpires: MoreThan(new Date()),
      },
    });
    if (!res) throw new ForbiddenException('reset code is invalid');

    res.resetCodeVerified = true;
    await this.userRepo.save(res);
    return 'resetCode verified';
  }

  async resetPassword(user: any, newPassword: string) {
    const password = await bcrypt.hash(newPassword, 10);
    if (user.resetCodeVerified) {
      user.password = password;
    }

    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    user.resetCodeVerified = false;
    await this.userRepo.save(user);

    return 'password have been reset successfully';
  }
}
