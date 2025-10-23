import { MailerService } from '@nestjs-modules/mailer';
export declare class NotificationsService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail({ to, subject, message }: {
        to: any;
        subject: any;
        message: any;
    }): Promise<any>;
}
