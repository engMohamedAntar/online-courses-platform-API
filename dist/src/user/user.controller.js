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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const passport_1 = require("@nestjs/passport");
const createUser_dto_1 = require("./dto/createUser.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guards_1 = require("../common/guards/roles.guards");
const platform_express_1 = require("@nestjs/platform-express");
const crypto_1 = require("crypto");
const upload_service_1 = require("../upload/upload.service");
let UserController = class UserController {
    userService;
    uploadService;
    constructor(userService, uploadService) {
        this.userService = userService;
        this.uploadService = uploadService;
    }
    async geMe(req) {
        return await this.userService.getMe(req.user.id);
    }
    async updateMe(req, body, file) {
        if (file) {
            const fileName = this.uploadService.buildFileKey('users', file.originalname);
            const key = await this.uploadService.upload(file, fileName);
            body.profileImageKey = key;
        }
        return await this.userService.updateMe(req.user.id, body);
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    getOneUser(id) {
        return this.userService.getOneUser(id);
    }
    async createUser(body, file) {
        if (file) {
            const fileName = `courses/thumbnails/${(0, crypto_1.randomUUID)()}-${file.originalname}`;
            const key = await this.uploadService.upload(file, fileName);
            body.profileImageKey = key;
        }
        return this.userService.createUser(body);
    }
    updateUser(id, body) {
        return this.userService.updateUser(id, body);
    }
    removeUser(id) {
        return this.userService.removeUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, roles_decorator_1.Roles)('student', 'instructor', 'admin'),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "geMe", null);
__decorate([
    (0, roles_decorator_1.Roles)('student', 'instructor', 'admin'),
    (0, common_1.Patch)('me'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profileImage')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMe", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profileImage')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guards_1.RolesGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        upload_service_1.UploadService])
], UserController);
//# sourceMappingURL=user.controller.js.map