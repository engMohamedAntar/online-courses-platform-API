import { Course } from 'src/course/course.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Payment } from 'src/payment/payment.entity';
export declare enum UserRole {
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    profileImageKey: string;
    courses: [Course];
    enrollments: Enrollment[];
    payments: Payment[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
