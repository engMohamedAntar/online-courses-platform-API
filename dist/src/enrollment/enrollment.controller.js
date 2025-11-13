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
exports.EnrollmentController = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guards_1 = require("../common/guards/roles.guards");
const updateStatus_dto_1 = require("./dto/updateStatus.dto");
let EnrollmentController = class EnrollmentController {
    enrollmentService;
    constructor(enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    async getEnrollmentById(id, req) {
        return await this.enrollmentService.getEnrollmentById(id, req.user.id);
    }
    async getCourseEnrollments(courseId, req) {
        return await this.enrollmentService.getCourseEnrollments(courseId, req.user.id);
    }
    async getUserEnrollments(userId, req) {
        return await this.enrollmentService.getUserEnrollments(userId, req.user);
    }
    async updateEnrollmentStatus(id, body) {
        return await this.enrollmentService.updateEnrollmentStatus(id, body);
    }
};
exports.EnrollmentController = EnrollmentController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getEnrollmentById", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin', 'instructor'),
    (0, common_1.Get)('/course/:courseId'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getCourseEnrollments", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin', 'student'),
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getUserEnrollments", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateStatus_dto_1.UpdateEnrollmentStatusDto]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "updateEnrollmentStatus", null);
exports.EnrollmentController = EnrollmentController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guards_1.RolesGuard),
    (0, common_1.Controller)('enrollment'),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentService])
], EnrollmentController);
//# sourceMappingURL=enrollment.controller.js.map