"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const course_entity_1 = require("../course/course.entity");
const lesson_entity_1 = require("../lesson/lesson.entity");
const enrollment_entity_1 = require("../enrollment/enrollment.entity");
const payment_entity_1 = require("../payment/payment.entity");
const upload_module_1 = require("../upload/upload.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, course_entity_1.Course, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment, payment_entity_1.Payment]), upload_module_1.UploadModule],
        providers: [user_service_1.UserService],
        exports: [typeorm_1.TypeOrmModule, user_service_1.UserService],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map