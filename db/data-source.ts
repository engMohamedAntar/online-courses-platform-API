import { Course } from '../src/course/course.entity';
import { Enrollment } from '../src/enrollment/enrollment.entity';
import { Lesson } from '../src/lesson/lesson.entity';
import { Payment } from '../src/payment/payment.entity';
import { User } from '../src/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.Neon_DB_URL,
  entities: [User, Course, Lesson, Enrollment, Payment],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource= new DataSource(dataSourceOptions);
export default dataSource;