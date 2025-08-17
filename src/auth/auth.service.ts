//auth.service.ts
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/userResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto):Promise<UserResponseDto> {
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
}