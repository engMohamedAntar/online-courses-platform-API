import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UploadService } from 'src/upload/upload.service';
export declare class UserService {
    private usersRepository;
    private uploadService;
    constructor(usersRepository: Repository<User>, uploadService: UploadService);
    getAllUsers(): Promise<User[]>;
    getOneUser(id: number): Promise<User>;
    createUser(body: CreateUserDto): Promise<User>;
    updateUser(id: number, body: Partial<User>): Promise<{
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
    } & User>;
    removeUser(id: number): Promise<void>;
    getMe(userId: number): Promise<{
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
    updateMe(userId: number, body: Partial<User>): Promise<{
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
    } & User>;
    findByEmail(email: string): Promise<User | null>;
}
