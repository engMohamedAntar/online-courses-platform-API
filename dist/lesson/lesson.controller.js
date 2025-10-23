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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const createLessonDto_1 = require("./dto/createLessonDto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guards_1 = require("../common/guards/roles.guards");
const updateLessonDto_1 = require("./dto/updateLessonDto");
let LessonController = class LessonController {
    lessonService;
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    async createLesson(body, req) {
        return await this.lessonService.createLesson(body, req.user.id);
    }
    async getLessonVideo(lessonId, req) {
        return await this.lessonService.getLessonVideo(lessonId, req.user.id);
    }
    async getLessonsForCourse(courseId) {
        return await this.lessonService.getLessonsForCourse(courseId);
    }
    async getLesson(id) {
        return this.lessonService.getLesson(id);
    }
    async updateLesson(id, body, req) {
        return this.lessonService.updateLesson(id, body, req.user.id);
    }
    async deleteLesson(id, req) {
        await this.lessonService.deleteLesson(id, req.user.id);
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, roles_decorator_1.Roles)('instructor'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createLessonDto_1.CreateLessonDto, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Get)('/:id/video'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLessonVideo", null);
__decorate([
    (0, common_1.Get)('/course/:courseId'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLessonsForCourse", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLesson", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateLessonDto_1.UpdateLessonDto, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "deleteLesson", null);
exports.LessonController = LessonController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guards_1.RolesGuard),
    (0, common_1.Controller)('lesson'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map