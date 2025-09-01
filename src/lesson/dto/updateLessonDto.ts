import { IsOptional, IsString } from "class-validator";

export class UpdateLessonDto{
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    videoUrl: string;

    @IsOptional()
    @IsString()
    description: string;
}