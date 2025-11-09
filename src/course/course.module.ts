import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserModule } from '../user/user.module';
import { UploadModule } from '../upload/upload.module';

//course.module.ts
@Module({
  imports: [UserModule, UploadModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
 