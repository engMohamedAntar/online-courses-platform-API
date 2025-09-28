import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { UserModule } from '../user/user.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

//enrollment.module
@Module({
  imports:[UserModule, NotificationsModule],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
  exports: [EnrollmentService]
})
export class EnrollmentModule {} 
