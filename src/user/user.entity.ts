//user.entity.ts
import { Exclude } from 'class-transformer';
import { Course } from 'src/course/course.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

//user.entity.ts
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;

  @Exclude() 
  @Column() 
  password: string;

  @Column({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;
  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Course, (course) => course.instructor) 
  courses: [Course];

  @OneToMany(()=> Enrollment, (enrollment)=> enrollment.user)
  enrollments: Enrollment[];

  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
