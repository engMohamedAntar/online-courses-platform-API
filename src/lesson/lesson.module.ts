import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [LessonService],
  controllers: [LessonController],
  imports: [UserModule]
})
export class LessonModule {}
