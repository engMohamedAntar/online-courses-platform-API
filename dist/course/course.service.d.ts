import { Repository } from 'typeorm';
import { CreateCourseDto } from './dtos/createCourse.dto';
import { Course } from './course.entity';
import { User } from 'src/user/user.entity';
import { UpdateCourseDto } from './dtos/updateCourse.dto';
export declare class CourseService {
    private courseRepo;
    private userRepository;
    constructor(courseRepo: Repository<Course>, userRepository: Repository<User>);
    createCourse(body: CreateCourseDto, userId: number): Promise<Course>;
    getAllCourses(): Promise<Course[]>;
    getOneCourse(id: number): Promise<Course>;
    updateCourse(id: number, body: UpdateCourseDto, userId: number): Promise<Course>;
    deleteCourse(id: number, userId: any, role: any): Promise<void>;
}
