import {IsNumber, IsOptional, IsString, Length } from 'class-validator';

//updateCourse.dto.ts
export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @Length(3,40)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
