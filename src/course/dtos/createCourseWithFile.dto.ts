import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseWithFileDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false })
  duration: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  thumbnail: any;   // IMPORTANT for showing the file upload in Swagger
}
