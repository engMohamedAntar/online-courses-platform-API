import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/createLessonDto';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { UpdateLessonDto } from './dto/updateLessonDto';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { UploadService } from 'src/upload/upload.service';
export declare class LessonService {
    private uploadService;
    private lessonRepo;
    private userRepo;
    private courseRepo;
    private enrollmentRepo;
    constructor(uploadService: UploadService, lessonRepo: Repository<Lesson>, userRepo: Repository<User>, courseRepo: Repository<Course>, enrollmentRepo: Repository<Enrollment>);
    createLesson(body: CreateLessonDto, userId: number): Promise<{
        id: number;
        title: string;
        videoKey: string;
        description: string;
        courseId: number;
    }>;
    getLessonVideo(lessonId: number, userId: number): Promise<{
        url: string;
    }>;
    getLessonsForCourse(courseId: number): Promise<Lesson[]>;
    getLesson(id: number): Promise<Lesson>;
    updateLesson(id: number, body: UpdateLessonDto, userId: number): Promise<Lesson>;
    deleteLesson(id: number, userId: number): Promise<void>;
}
