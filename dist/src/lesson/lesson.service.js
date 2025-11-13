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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("./lesson.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const enrollment_entity_1 = require("../enrollment/enrollment.entity");
const upload_service_1 = require("../upload/upload.service");
let LessonService = class LessonService {
    uploadService;
    lessonRepo;
    userRepo;
    courseRepo;
    enrollmentRepo;
    constructor(uploadService, lessonRepo, userRepo, courseRepo, enrollmentRepo) {
        this.uploadService = uploadService;
        this.lessonRepo = lessonRepo;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
        this.enrollmentRepo = enrollmentRepo;
    }
    async createLesson(body, userId) {
        const instructor = await this.userRepo.findOneBy({ id: userId });
        if (!instructor)
            throw new common_1.NotFoundException(`No user for this id ${userId}`);
        const course = await this.courseRepo.findOne({
            where: { id: body.courseId },
            relations: ['instructor'],
        });
        if (!course)
            throw new common_1.NotFoundException(`No course found for this id ${body.courseId}`);
        if (course.instructor.id !== instructor.id)
            throw new common_1.ForbiddenException('You are not allowed to create a lesson for this course');
        const lesson = this.lessonRepo.create({ ...body, course });
        const savedLesson = await this.lessonRepo.save(lesson);
        return {
            id: savedLesson.id,
            title: savedLesson.title,
            videoKey: savedLesson.videoKey,
            description: savedLesson.description,
            courseId: course.id,
        };
    }
    async getLessonVideo(lessonId, userId) {
        const lesson = await this.lessonRepo.findOne({
            where: { id: lessonId },
            relations: ['course'],
        });
        if (!lesson)
            throw new common_1.NotFoundException(`No lesson found for this id ${lessonId}`);
        const enrollment = await this.enrollmentRepo.findOne({
            where: {
                user: { id: userId },
                course: { id: lesson.course.id },
            },
        });
        if (!enrollment)
            throw new common_1.NotFoundException(`You are not enrolled`);
        const url = await this.uploadService.getDownloadSignedUrl(lesson.videoKey, 3600);
        return { url };
    }
    async getLessonsForCourse(courseId) {
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!course)
            throw new common_1.NotFoundException(`No course found for this id ${courseId}`);
        const lessons = await this.lessonRepo.find({
            where: { course: { id: courseId } },
        });
        return lessons;
    }
    async getLesson(id) {
        const lesson = await this.lessonRepo.findOneBy({ id });
        if (!lesson)
            throw new common_1.NotFoundException(`No lesson found for this id ${id}`);
        return lesson;
    }
    async updateLesson(id, body, userId) {
        const instructor = await this.userRepo.findOneBy({ id: userId });
        if (!instructor) {
            throw new common_1.NotFoundException(`No user found for this id ${userId}`);
        }
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            relations: ['course', 'course.instructor'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`No lesson found for this id ${id}`);
        }
        if (lesson.course.instructor.id !== instructor.id) {
            throw new common_1.ForbiddenException('You are not allowed to update a lesson for this course');
        }
        Object.assign(lesson, body);
        return await this.lessonRepo.save(lesson);
    }
    async deleteLesson(id, userId) {
        const instructor = await this.userRepo.findOneBy({ id: userId });
        if (!instructor)
            throw new common_1.NotFoundException(`No user for this id ${userId}`);
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            relations: ['course', 'course.instructor'],
        });
        if (!lesson)
            throw new common_1.NotFoundException(`No lesson found for this id ${id}`);
        if (lesson.course.instructor.id !== instructor.id)
            throw new common_1.ForbiddenException('You are not allowed to create a lesson for this course');
        await this.lessonRepo.delete({ id });
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(4, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonService);
//# sourceMappingURL=lesson.service.js.map