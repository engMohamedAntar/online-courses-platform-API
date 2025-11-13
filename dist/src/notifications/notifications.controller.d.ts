import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    sendMail(): Promise<{
        message: string;
        mail: any;
    }>;
}
