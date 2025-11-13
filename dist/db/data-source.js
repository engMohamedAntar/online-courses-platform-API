"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const course_entity_1 = require("../src/course/course.entity");
const enrollment_entity_1 = require("../src/enrollment/enrollment.entity");
const lesson_entity_1 = require("../src/lesson/lesson.entity");
const payment_entity_1 = require("../src/payment/payment.entity");
const user_entity_1 = require("../src/user/user.entity");
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
    type: 'postgres',
    url: 'postgresql://neondb_owner:npg_g67iQAPrXles@ep-icy-rice-a49l0aid-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    entities: [user_entity_1.User, course_entity_1.Course, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment, payment_entity_1.Payment],
    migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map