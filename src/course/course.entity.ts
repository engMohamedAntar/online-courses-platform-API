import { Lesson } from 'src/lesson/lesson.entity';
import { User } from 'src/user/user.entity';
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
  @Column({ type: 'text' , nullable: true})
  description: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  duration: number; 

  @Column({ default: 0 })
  enrolledCount: number;

  @ManyToOne(()=> User, (user)=> user.courses)
  instructor: User

  @OneToMany(()=> Lesson, (lesson)=> lesson.course)
  lessons: Lesson[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}