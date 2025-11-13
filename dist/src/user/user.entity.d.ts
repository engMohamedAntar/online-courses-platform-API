import { Course } from '../course/course.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Payment } from '../payment/payment.entity';
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
