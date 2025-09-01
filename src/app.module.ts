import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot(), UserModule, CourseModule, LessonModule],
    providers: [{provide: APP_INTERCEPTOR, useClass: ValidationPipe}]
})
export class AppModule {}
