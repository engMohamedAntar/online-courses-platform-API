import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { EnrollmentService } from '../enrollment/enrollment.service';
export declare class PaymentService {
    private paymentRepo;
    private enrollmentService;
    constructor(paymentRepo: Repository<Payment>, enrollmentService: EnrollmentService);
    createPayment(user: User, course: Course): Promise<Payment>;
    createSession(paymentId: number, user: User, course: Course): Promise<any>;
    handleWebhook(req: any): Promise<{
        received: boolean;
    }>;
}
