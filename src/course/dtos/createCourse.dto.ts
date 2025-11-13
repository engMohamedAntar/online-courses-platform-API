import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

//createCourse.dto.ts
export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @Length(3,40)
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    thumbnailKey: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    duration: number;
}