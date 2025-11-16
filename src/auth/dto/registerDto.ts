import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

//rigisterDto.ts
export class RegisterDto {
  @IsNotEmpty({ message: 'name can not be empty' })
  @ApiProperty()
  name: string;

  @IsEmail({}, { message: 'email not a valid email' })
  @ApiProperty()
  email: string;

  @MinLength(6, { message: 'password should be at least 6 digits' })
  @ApiProperty()
  password: string;
}
