import { Controller, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guards';

@UseGuards(AuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Roles('admin')
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
