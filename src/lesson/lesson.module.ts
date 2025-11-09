import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { UserModule } from '../user/user.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  providers: [LessonService],
  controllers: [LessonController],
  imports: [UserModule, UploadModule]
})
export class LessonModule {}
