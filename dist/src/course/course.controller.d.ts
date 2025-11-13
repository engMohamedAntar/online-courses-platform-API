import { CourseService } from './course.service';
import { UpdateCourseDto } from './dtos/updateCourse.dto';
import { UploadService } from '../upload/upload.service';
import { CreateCourseDto } from './dtos/createCourse.dto';
export declare class CourseController {
    private courseService;
    private uploadService;
    constructor(courseService: CourseService, uploadService: UploadService);
    createCourse(body: CreateCourseDto, req: any, file: Express.Multer.File): Promise<import("./course.entity").Course>;
    getAllCourses(): Promise<import("./course.entity").Course[]>;
    getOneCourse(id: number): Promise<import("./course.entity").Course>;
    updateCourse(id: number, body: UpdateCourseDto, req: any): Promise<import("./course.entity").Course>;
    deleteCourse(id: number, req: any): Promise<void>;
}
