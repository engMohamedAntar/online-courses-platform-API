//auth.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
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

  async login(body: LoginDto){
    const user= await this.userRepo.findOneBy({email: body.email});
  
    console.log(user);
    
    if(!user) 
      throw new NotFoundException('No user found for this email');
    //check weather user body.password === user.password using bcrypt    
    const valid= await bcrypt.compare(body.password, user.password);
    if(!valid)
      throw new ForbiddenException('Invalid email or password');
    
    //generate JWT token
    const token= this.jwtService.sign({sub:user.id, email:user.email});
    return new UserResponseDto(user, token);
  }
} 
