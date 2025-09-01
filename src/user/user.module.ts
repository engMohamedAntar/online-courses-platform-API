import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Course } from 'src/course/course.entity';
import { Lesson } from 'src/lesson/lesson.entity';

//user.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Lesson])],
  providers: [UserService],
  exports: [TypeOrmModule],
  controllers: [UserController]
})
export class UserModule {}
