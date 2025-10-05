//auth.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { LoginDto } from './dto/loginDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async login(body: LoginDto) {
    const user = await this.userRepo.findOneBy({ email: body.email });

    if (!user) throw new NotFoundException('No user found for this email');
    //check weather user body.password === user.password using bcrypt
    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) throw new ForbiddenException('Invalid email or password');

    const payload = { sub: user.id, email: user.email };

    //generate JWT token
    const token = this.jwtService.sign(payload);

    //generate refresh JWT token
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_JWT_EXPIRE_IN'),
    });

    return new UserResponseDto(user, token, refreshToken);
  }

  refreshToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {token};
  }
}
