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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guards_1 = require("../common/guards/roles.guards");
const updateCourse_dto_1 = require("./dtos/updateCourse.dto");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../upload/upload.service");
const createCourse_dto_1 = require("./dtos/createCourse.dto");
let CourseController = class CourseController {
    courseService;
    uploadService;
    constructor(courseService, uploadService) {
        this.courseService = courseService;
        this.uploadService = uploadService;
    }
    async createCourse(body, req, file) {
        const fileName = this.uploadService.buildFileKey('courses', file.originalname);
        const key = await this.uploadService.upload(file, fileName);
        body.thumbnailKey = key;
        return await this.courseService.createCourse(body, req.user.id);
    }
    async getAllCourses() {
        return await this.courseService.getAllCourses();
    }
    async getOneCourse(id) {
        return await this.courseService.getOneCourse(id);
    }
    async updateCourse(id, body, req) {
        return await this.courseService.updateCourse(id, body, req.user.id);
    }
    async deleteCourse(id, req) {
        return await this.courseService.deleteCourse(id, req.user.id, req.user.role);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumbnail')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCourse_dto_1.CreateCourseDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getOneCourse", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateCourse_dto_1.UpdateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)('instructor', 'admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        upload_service_1.UploadService])
], CourseController);
//# sourceMappingURL=course.controller.js.map