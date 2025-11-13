import { Enrollment } from '../enrollment/enrollment.entity';
import { Lesson } from '../lesson/lesson.entity';
import { Payment } from '../payment/payment.entity';
import { User } from '../user/user.entity';
export declare class Course {
    id: number;
    title: string;
    description: string;
    thumbnailKey: string;
    price: number;
    duration: number;
    enrolledCount: number;
    instructor: User;
    lessons: Lesson[];
    enrollments: Enrollment[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
}
