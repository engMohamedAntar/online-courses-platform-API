import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { UserResponseDto } from '../user/dto/userResponse.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<UserResponseDto>;
    login(req: any): Promise<{
        id: number;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(req: any): {
        accessToken: string;
    };
    auth(): Promise<void>;
    googleAuthCallback(req: any, res: any): Promise<void>;
    forgotPassword(req: any): Promise<string>;
    verifyResetCode(req: any, body: any): Promise<string>;
    resetPassword(req: any, body: any): Promise<string>;
}
