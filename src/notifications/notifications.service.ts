import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class NotificationsService {
  constructor(private mailerService: MailerService) {}

  async sendMail(options:{subject:string, message:string }) {
    const mail= await this.mailerService.sendMail({
      from: 'Mohamed Antar <antarexplorer1@gmail.com>',
      to: 'aboantar852003@gmail.com',
      subject: options.subject,
      text: options.message,
    });
    return mail;
  }
  
}
