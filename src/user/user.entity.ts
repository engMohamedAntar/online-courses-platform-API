//user.entity.ts
import { Course } from "src/course/course.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
  STUDENT= 'student',
  INSTRUCTOR= 'instructor',
  ADMIN= 'admin'
}

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({unique:true})
  email: string;
  @Column()
  password: string;
  @Column({enum:UserRole, default: UserRole.STUDENT})
  role: UserRole;
  @Column({nullable: true})
  profileImage: string;

  @OneToMany(()=>Course, (course)=> course.instructor)
  courses: [Course];

  @Column({default: true})
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}