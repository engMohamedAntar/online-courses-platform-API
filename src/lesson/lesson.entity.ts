import { Course } from "src/course/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

//lesson.entity.ts
@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column({nullable: true})
    videoKey: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @ManyToOne(()=> Course, (course)=> course.lessons, {onDelete: "CASCADE"})
    course: Course;
}