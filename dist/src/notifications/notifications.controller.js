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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guards_1 = require("../common/guards/roles.guards");
let NotificationsController = class NotificationsController {
    notificationsService;
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async sendMail() {
        const mail = await this.notificationsService.sendMail({
            to: 'aboantar852003@gmail.com',
            subject: 'sendMail controller hope',
            message: 'This message is from the controller of sendMail POST notifications/mail',
        });
        return { message: 'success', mail };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)('mail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendMail", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guards_1.RolesGuard),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map