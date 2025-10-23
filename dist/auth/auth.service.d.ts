import { RegisterDto } from './dto/registerDto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/dto/userResponse.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
export declare class AuthService {
    private userRepo;
    private jwtService;
    private configService;
    private userService;
    constructor(userRepo: Repository<User>, jwtService: JwtService, configService: ConfigService, userService: UserService);
    register(body: RegisterDto): Promise<UserResponseDto>;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(user: User): Promise<{
        id: number;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(user: any): {
        accessToken: string;
    };
    validateGoogleUser(googleUser: CreateUserDto): Promise<User>;
    validateUser(email: string, pass: string): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("src/user/user.entity").UserRole;
        profileImageKey: string;
        courses: [import("../course/course.entity").Course];
        enrollments: import("../enrollment/enrollment.entity").Enrollment[];
        payments: import("../payment/payment.entity").Payment[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
