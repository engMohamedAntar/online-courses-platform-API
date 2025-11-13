"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enrollment_entity_1 = require("./enrollment.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
let EnrollmentService = class EnrollmentService {
    enrollmentRepo;
    userRepo;
    courseRepo;
    constructor(enrollmentRepo, userRepo, courseRepo) {
        this.enrollmentRepo = enrollmentRepo;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
    }
    async createEnrollmentAfterPayment(user, course) {
        const existing = await this.enrollmentRepo.findOne({
            where: { user: { id: user.id }, course: { id: course.id } },
        });
        if (existing)
            return existing;
        const enrollment = this.enrollmentRepo.create({
            user,
            course,
            paymentStatus: enrollment_entity_1.PaymentStatus.SUCCESS,
        });
        return await this.enrollmentRepo.save(enrollment);
    }
    async getEnrollmentById(id, userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException(`No user found for this id ${userId}`);
        const enrollment = await this.enrollmentRepo.findOne({
            where: { id },
            relations: ['user', 'course', 'course.instructor'],
        });
        if (!enrollment)
            throw new common_1.NotFoundException(`No enrollment found for this id ${id}`);
        if (user.role === user_entity_1.UserRole.STUDENT && enrollment.user.id !== user.id)
            throw new common_1.ForbiddenException(`You are not allowed to see this enrollment`);
        if (user.role === user_entity_1.UserRole.INSTRUCTOR &&
            enrollment.course.instructor.id !== user.id)
            throw new common_1.ForbiddenException(`You are not allowed to see this enrollment`);
        return enrollment;
    }
    async getCourseEnrollments(courseId, userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException(`No user found for this id ${userId}`);
        const course = await this.courseRepo.findOne({
            where: { id: courseId },
            relations: ['instructor'],
        });
        if (!course)
            throw new common_1.NotFoundException(`No course found for this id ${courseId}`);
        if (user.role === user_entity_1.UserRole.INSTRUCTOR && course.instructor.id !== user.id)
            throw new common_1.ForbiddenException(`You are not allowed show enrollments of this course`);
        return await this.enrollmentRepo.find({
            where: { course: { id: courseId } },
            relations: ['user'],
        });
    }
    async getUserEnrollments(userId, loggedInUser) {
        if (loggedInUser.role === user_entity_1.UserRole.STUDENT && loggedInUser.id !== userId)
            throw new common_1.ForbiddenException(`You are not allowed to show enrollments of this user`);
        return await this.enrollmentRepo.find({
            where: { user: { id: userId } },
        });
    }
    async updateEnrollmentStatus(enrollmentId, body) {
        const enrollment = await this.enrollmentRepo.findOneBy({
            id: enrollmentId,
        });
        if (!enrollment)
            throw new common_1.NotFoundException(`No enrollment found for this id ${enrollmentId}`);
        enrollment.paymentStatus = body.status;
        return await this.enrollmentRepo.save(enrollment);
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map