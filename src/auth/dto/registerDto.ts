import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

//rigisterDto.ts
export class RegisterDto {
  @IsNotEmpty({message:'name can not be empty'})
  name: string;
  @IsEmail({},{message:'email not a valid email'})
  email: string;
  @MinLength(6, {message:'password should be at least 6 digits'})
  password: string;
}
