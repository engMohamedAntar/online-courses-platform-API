import { CourseService } from './course.service';
import { UpdateCourseDto } from './dtos/updateCourse.dto';
import { UploadService } from 'src/upload/upload.service';
export declare class CourseController {
    private courseService;
    private uploadService;
    constructor(courseService: CourseService, uploadService: UploadService);
    createCourse(body: any, req: any, file: Express.Multer.File): Promise<import("./course.entity").Course>;
    getAllCourses(): Promise<import("./course.entity").Course[]>;
    getOneCourse(id: number): Promise<import("./course.entity").Course>;
    updateCourse(id: number, body: UpdateCourseDto, req: any): Promise<import("./course.entity").Course>;
    deleteCourse(id: number, req: any): Promise<void>;
}
