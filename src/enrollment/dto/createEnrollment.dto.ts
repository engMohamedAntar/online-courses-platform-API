import { IsInt, IsNotEmpty } from 'class-validator';

//CreateEnrollmentDto
export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsInt()
  courseId: number;
}
