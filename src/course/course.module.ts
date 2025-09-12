import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserModule } from '../user/user.module';

//course.module.ts
@Module({
  imports: [UserModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
 