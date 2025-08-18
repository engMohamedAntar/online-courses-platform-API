import { IsEmail, MinLength } from "class-validator";

//loginDto.ts
export class LoginDto {
  @IsEmail({},{message:'email not a valid email'})
  email: string;
  @MinLength(6, {message:'password should be at least 6 digits'})
  password: string;
}
