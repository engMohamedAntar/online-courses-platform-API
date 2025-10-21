//auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
    return await this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('/refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async auth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Request() req, @Res() res) {
    const response = await this.authService.login(req.user);
    res.status(200).json({accessToken: response.accessToken, refreshToken: response.refreshToken});
    //if there is a front end, redirect to it
    // res.redirect(`http://localhost:5173?access=${response.accessToken}&refresh=${response.refreshToken}`); 

  }
}
