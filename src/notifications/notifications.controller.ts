import { Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @Post('mail')
  async sendMail() {
    const mail = await this.notificationsService.sendMail({
      to: 'aboantar852003@gmail.com',
      subject: 'sendMail controller',
      message:
        'This message is from the controller of sendMail POST notifications/mail',
    });
    return { message: 'success', mail };
  }
}
