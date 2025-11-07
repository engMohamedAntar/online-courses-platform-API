import { Enrollment } from '../enrollment/enrollment.entity';
import { Lesson } from '../lesson/lesson.entity';
import { Payment } from '../payment/payment.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//course.entity.ts
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnailKey: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: 0 })
  enrolledCount: number;

  @ManyToOne(() => User, (user) => user.courses)
  instructor: User;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Payment, (payment) => payment.course)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
