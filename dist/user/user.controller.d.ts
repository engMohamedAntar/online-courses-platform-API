import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UploadService } from 'src/upload/upload.service';
export declare class UserController {
    private userService;
    private uploadService;
    constructor(userService: UserService, uploadService: UploadService);
    geMe(req: any): Promise<{
        downloadSignedUrl: string | null;
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("./user.entity").UserRole;
        profileImageKey: string;
        courses: [import("../course/course.entity").Course];
        enrollments: import("../enrollment/enrollment.entity").Enrollment[];
        payments: import("../payment/payment.entity").Payment[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMe(req: any, body: any, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("./user.entity").UserRole;
        profileImageKey: string;
        courses: [import("../course/course.entity").Course];
        enrollments: import("../enrollment/enrollment.entity").Enrollment[];
        payments: import("../payment/payment.entity").Payment[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } & import("./user.entity").User>;
    getAllUsers(): Promise<import("./user.entity").User[]>;
    getOneUser(id: number): Promise<import("./user.entity").User>;
    createUser(body: CreateUserDto, file: Express.Multer.File): Promise<import("./user.entity").User>;
    updateUser(id: number, body: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import("./user.entity").UserRole;
        profileImageKey: string;
        courses: [import("../course/course.entity").Course];
        enrollments: import("../enrollment/enrollment.entity").Enrollment[];
        payments: import("../payment/payment.entity").Payment[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } & import("./user.entity").User>;
    removeUser(id: number): Promise<void>;
}
