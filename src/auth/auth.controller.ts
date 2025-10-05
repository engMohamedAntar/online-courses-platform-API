//auth.controller.ts
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { LoginDto } from './dto/loginDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
    return await this.authService.register(dto);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<UserResponseDto> {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('/refresh')
  refreshToken(@Request() req){
    return this.authService.refreshToken(req.user);
  }

}