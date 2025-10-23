"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const core_1 = require("@nestjs/core");
const course_module_1 = require("./course/course.module");
const lesson_module_1 = require("./lesson/lesson.module");
const enrollment_module_1 = require("./enrollment/enrollment.module");
const payment_module_1 = require("./payment/payment.module");
const upload_module_1 = require("./upload/upload.module");
const notifications_module_1 = require("./notifications/notifications.module");
const mailer_1 = require("@nestjs-modules/mailer");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            user_module_1.UserModule,
            course_module_1.CourseModule,
            lesson_module_1.LessonModule,
            enrollment_module_1.EnrollmentModule,
            payment_module_1.PaymentModule,
            upload_module_1.UploadModule,
            notifications_module_1.NotificationsModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
            }),
        ],
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: common_1.ClassSerializerInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map