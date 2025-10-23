import { Enrollment } from './enrollment.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { UpdateEnrollmentStatusDto } from './dto/updateStatus.dto';
export declare class EnrollmentService {
    private enrollmentRepo;
    private userRepo;
    private courseRepo;
    constructor(enrollmentRepo: Repository<Enrollment>, userRepo: Repository<User>, courseRepo: Repository<Course>);
    createEnrollmentAfterPayment(user: User, course: Course): Promise<Enrollment>;
    getEnrollmentById(id: number, userId: number): Promise<Enrollment>;
    getCourseEnrollments(courseId: number, userId: number): Promise<Enrollment[]>;
    getUserEnrollments(userId: number, loggedInUser: {
        id: number;
        role: UserRole;
    }): Promise<Enrollment[]>;
    updateEnrollmentStatus(enrollmentId: number, body: UpdateEnrollmentStatusDto): Promise<Enrollment>;
}
