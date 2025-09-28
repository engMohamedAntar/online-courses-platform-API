import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [MailerModule],
  exports: [NotificationsService]
})
export class NotificationsModule {}
