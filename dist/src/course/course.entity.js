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
exports.Course = void 0;
const enrollment_entity_1 = require("../enrollment/enrollment.entity");
const lesson_entity_1 = require("../lesson/lesson.entity");
const payment_entity_1 = require("../payment/payment.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let Course = class Course {
    id;
    title;
    description;
    thumbnailKey;
    price;
    duration;
    enrolledCount;
    instructor;
    lessons;
    enrollments;
    payments;
    createdAt;
    updatedAt;
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "thumbnailKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "enrolledCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.courses),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.course),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (enrollment) => enrollment.course),
    __metadata("design:type", Array)
], Course.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.course),
    __metadata("design:type", Array)
], Course.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)()
], Course);
//# sourceMappingURL=course.entity.js.map