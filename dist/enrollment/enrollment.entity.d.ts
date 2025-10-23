import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed"
}
export declare class Enrollment {
    id: number;
    user: User;
    course: Course;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}
