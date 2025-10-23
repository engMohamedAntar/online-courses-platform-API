import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
declare const RefreshJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private userRepo;
    constructor(configService: ConfigService, userRepo: Repository<User>);
    validate(payload: any): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("src/user/user.entity").UserRole;
        profileImageKey: string;
        courses: [import("../../course/course.entity").Course];
        enrollments: import("../../enrollment/enrollment.entity").Enrollment[];
        payments: import("../../payment/payment.entity").Payment[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
