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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const typeorm_2 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guards_1 = require("../common/guards/roles.guards");
let PaymentController = class PaymentController {
    paymentService;
    userRepo;
    courseRepo;
    constructor(paymentService, userRepo, courseRepo) {
        this.paymentService = paymentService;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
    }
    async createCheckoutSession(courseId, req) {
        const user = await this.userRepo.findOneBy({ id: req.user.id });
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!user || !course) {
            throw new common_1.NotFoundException('user or course not found');
        }
        const payment = await this.paymentService.createPayment(user, course);
        return await this.paymentService.createSession(payment.id, user, course);
    }
    successPage() {
        return process.env.STRIPE_WEBHOOK_SECRET;
        return 'Payment is success ali';
    }
    cancelPage() {
        return process.env.STRIPE_WEBHOOK_SECRET;
        return 'Payment canceled ali';
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    (0, common_1.Post)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createCheckoutSession", null);
__decorate([
    (0, common_1.Get)('success'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "successPage", null);
__decorate([
    (0, common_1.Get)('cancel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "cancelPage", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map