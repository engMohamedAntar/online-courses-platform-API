import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private mailerService: MailerService) {}

  async sendMail({ to, subject, message }) {
    const mail = await this.mailerService.sendMail({
      from: 'Mohamed Antar <antarexplorer1@gmail.com>',
      to: to,
      subject: subject,
      text: message,
    });
    return mail;
  }
}
