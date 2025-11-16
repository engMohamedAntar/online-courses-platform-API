"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const course_entity_1 = require("../src/course/course.entity");
const enrollment_entity_1 = require("../src/enrollment/enrollment.entity");
const lesson_entity_1 = require("../src/lesson/lesson.entity");
const payment_entity_1 = require("../src/payment/payment.entity");
const user_entity_1 = require("../src/user/user.entity");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dataSourceOptions = {
    type: 'postgres',
    url: process.env.Neon_DB_URL,
    entities: [user_entity_1.User, course_entity_1.Course, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment, payment_entity_1.Payment],
    migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map