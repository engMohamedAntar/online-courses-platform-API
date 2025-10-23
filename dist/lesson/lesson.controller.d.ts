import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/createLessonDto';
import { UpdateLessonDto } from './dto/updateLessonDto';
export declare class LessonController {
    private lessonService;
    constructor(lessonService: LessonService);
    createLesson(body: CreateLessonDto, req: any): Promise<{
        id: number;
        title: string;
        videoKey: string;
        description: string;
        courseId: number;
    }>;
    getLessonVideo(lessonId: number, req: any): Promise<{
        url: string;
    }>;
    getLessonsForCourse(courseId: number): Promise<import("./lesson.entity").Lesson[]>;
    getLesson(id: number): Promise<import("./lesson.entity").Lesson>;
    updateLesson(id: number, body: UpdateLessonDto, req: any): Promise<import("./lesson.entity").Lesson>;
    deleteLesson(id: number, req: any): Promise<void>;
}
