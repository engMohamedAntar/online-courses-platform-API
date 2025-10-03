//auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { LoginDto } from './dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
    return await this.authService.register(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<UserResponseDto> {
    return await this.authService.login(dto);
  }
}