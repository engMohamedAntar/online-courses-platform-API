import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateLessonDto{
    @IsString()
    title: string;
    @IsString()
    videoUrl: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsInt()
    courseId: number;
}