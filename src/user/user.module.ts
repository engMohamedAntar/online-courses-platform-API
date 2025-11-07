import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Course } from '../course/course.entity';
import { Lesson } from '../lesson/lesson.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Payment } from '../payment/payment.entity';
import { UploadModule } from '../upload/upload.module';

//user.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Lesson, Enrollment, Payment]), UploadModule],
  providers: [UserService], 
  exports: [TypeOrmModule, UserService],
  controllers: [UserController]
})
export class UserModule {}
