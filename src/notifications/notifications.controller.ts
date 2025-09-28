import { Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService:NotificationsService){}
    @Post('mail')
    async sendMail(){
        const mail= await this.notificationsService.sendMail({subject:'hello', message:'the email content'});
        return {message:'success', mail}
    }
}
