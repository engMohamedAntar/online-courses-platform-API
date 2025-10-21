//auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
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
  
}
