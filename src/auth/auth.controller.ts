//auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { UserResponseDto } from './dto/userResponse.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('/register')
     async register(@Body() dto:RegisterDto): Promise<UserResponseDto>{
        return await this.authService.register(dto);
    }
}
