import { PaymentService } from './payment.service';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
export declare class PaymentController {
    private readonly paymentService;
    private readonly userRepo;
    private readonly courseRepo;
    constructor(paymentService: PaymentService, userRepo: Repository<User>, courseRepo: Repository<Course>);
    createCheckoutSession(courseId: number, req: any): Promise<any>;
    successPage(): string | undefined;
    cancelPage(): string | undefined;
}
