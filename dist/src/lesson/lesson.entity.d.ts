import { Course } from "../course/course.entity";
export declare class Lesson {
    id: number;
    title: string;
    videoKey: string;
    description: string;
    course: Course;
}
