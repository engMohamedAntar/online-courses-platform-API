import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsString({ message: 'name must be string' })
  name: string;
  @IsEmail({}, { message: 'email not vlid' })
  email: string;
  @IsString({ message: 'name must be string' })
  @MinLength(6, { message: 'password should be at least 6 digits' })
  password: string;
  @IsOptional()
  @IsString()
  profileImageKey?: string;
  @IsOptional()
  @IsString({ message: 'role must be string' })
  role?: UserRole;
}
