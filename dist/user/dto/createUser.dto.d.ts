import { UserRole } from '../user.entity';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    profileImageKey?: string;
    role?: UserRole;
}
