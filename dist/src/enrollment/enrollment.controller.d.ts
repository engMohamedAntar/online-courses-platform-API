import { EnrollmentService } from './enrollment.service';
import { UpdateEnrollmentStatusDto } from './dto/updateStatus.dto';
export declare class EnrollmentController {
    private enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    getEnrollmentById(id: number, req: any): Promise<import("./enrollment.entity").Enrollment>;
    getCourseEnrollments(courseId: any, req: any): Promise<import("./enrollment.entity").Enrollment[]>;
    getUserEnrollments(userId: any, req: any): Promise<import("./enrollment.entity").Enrollment[]>;
    updateEnrollmentStatus(id: number, body: UpdateEnrollmentStatusDto): Promise<import("./enrollment.entity").Enrollment>;
}
