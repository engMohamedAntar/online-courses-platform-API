import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Lesson } from 'src/lesson/lesson.entity';
import { Payment } from 'src/payment/payment.entity';
import { User } from 'src/user/user.entity';
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
