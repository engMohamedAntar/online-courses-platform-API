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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
const user_entity_1 = require("../user/user.entity");
let CourseService = class CourseService {
    courseRepo;
    userRepository;
    constructor(courseRepo, userRepository) {
        this.courseRepo = courseRepo;
        this.userRepository = userRepository;
    }
    async createCourse(body, userId) {
        const instructor = await this.userRepository.findOneBy({ id: userId });
        if (!instructor)
            throw new common_1.NotFoundException(`No user found for this id ${instructor}`);
        const course = this.courseRepo.create({ ...body, instructor });
        return await this.courseRepo.save(course);
    }
    async getAllCourses() {
        const courses = await this.courseRepo.find();
        return courses;
    }
    async getOneCourse(id) {
        const course = await this.courseRepo.findOneBy({ id });
        if (!course)
            throw new common_1.NotFoundException(`No course found for this id ${id}`);
        return course;
    }
    async updateCourse(id, body, userId) {
        let course = await this.courseRepo.findOne({
            where: { id },
            relations: ['instructor'],
        });
        if (!course)
            throw new common_1.NotFoundException(`No course found for this id ${id}`);
        if (userId !== course.instructor.id)
            throw new common_1.ForbiddenException('You are not allowed to update this course');
        course = { ...course, ...body };
        return await this.courseRepo.save(course);
    }
    async deleteCourse(id, userId, role) {
        const course = await this.courseRepo.findOne({
            where: { id },
            relations: ['instructor'],
        });
        if (!course)
            throw new common_1.NotFoundException(`No course found for this id ${id}`);
        if (role !== 'admin' && course.instructor.id !== userId)
            throw new common_1.ForbiddenException('You are not allowed to delete this course');
        await this.courseRepo.delete({ id });
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CourseService);
//# sourceMappingURL=course.service.js.map