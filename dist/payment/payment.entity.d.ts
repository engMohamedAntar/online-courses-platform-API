import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed"
}
export declare enum PaymentProvider {
    STRIPE = "stripe",
    PAYPAL = "paypal"
}
export declare class Payment {
    id: number;
    amount: number;
    currency: string;
    status: PaymentStatus;
    provider: PaymentProvider;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    course: Course;
}
