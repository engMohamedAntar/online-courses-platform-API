import { Course } from '../src/course/course.entity';
import { Enrollment } from '../src/enrollment/enrollment.entity';
import { Lesson } from '../src/lesson/lesson.entity';
import { Payment } from '../src/payment/payment.entity';
import { User } from '../src/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_g67iQAPrXles@ep-icy-rice-a49l0aid-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  entities: [User, Course, Lesson, Enrollment, Payment],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource= new DataSource(dataSourceOptions);
export default dataSource;