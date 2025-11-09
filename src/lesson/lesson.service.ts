import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/createLessonDto';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { UpdateLessonDto } from './dto/updateLessonDto';
import { Enrollment } from '../enrollment/enrollment.entity';
import { UploadService } from '../upload/upload.service';

//lesson.service.ts
@Injectable()
export class LessonService {
  constructor(
    private uploadService: UploadService,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(Enrollment) private enrollmentRepo: Repository<Enrollment>,
  ) {}

  async createLesson(body: CreateLessonDto, userId: number) {
    //find instructor
    const instructor = await this.userRepo.findOneBy({ id: userId });
    if (!instructor)
      throw new NotFoundException(`No user for this id ${userId}`);

    //find course
    const course = await this.courseRepo.findOne({
      where: { id: body.courseId },
      relations: ['instructor'],
    });
    if (!course)
      throw new NotFoundException(
        `No course found for this id ${body.courseId}`,
      );

    //ensure that cours.instructor.id is the same as instructor.id
    if (course.instructor.id !== instructor.id)
      throw new ForbiddenException(
        'You are not allowed to create a lesson for this course',
      );

    // create lesson
    const lesson = this.lessonRepo.create({ ...body, course });
    const savedLesson = await this.lessonRepo.save(lesson);
    return {
      id: savedLesson.id,
      title: savedLesson.title,
      videoKey: savedLesson.videoKey,
      description: savedLesson.description,
      courseId: course.id,
    };
  }

  async getLessonVideo(lessonId: number, userId: number) {
    // 1. Fetch lesson from DB
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: ['course'],
    });
    if (!lesson)
      throw new NotFoundException(`No lesson found for this id ${lessonId}`);

    // 2. Check if user is enrolled in the course
    const enrollment = await this.enrollmentRepo.findOne({
      where: {
        user: { id: userId },
        course: { id: lesson.course.id },
      },
    });
    if (!enrollment) throw new NotFoundException(`You are not enrolled`);

    // 3. Generate signed URL from lesson.videoKey
    const url = await this.uploadService.getDownloadSignedUrl(lesson.videoKey, 3600);

    return { url };
  }

  async getLessonsForCourse(courseId: number) {
    const course = await this.courseRepo.findOneBy({ id: courseId });
    if (!course)
      throw new NotFoundException(`No course found for this id ${courseId}`);
    const lessons = await this.lessonRepo.find({
      where: { course: { id: courseId } },
    });
    return lessons;
  }

  async getLesson(id: number) {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson)
      throw new NotFoundException(`No lesson found for this id ${id}`);
    return lesson;
  }

  async updateLesson(id: number, body: UpdateLessonDto, userId: number) {
    // find instructor
    const instructor = await this.userRepo.findOneBy({ id: userId });
    if (!instructor) {
      throw new NotFoundException(`No user found for this id ${userId}`);
    }

    // find lesson with its course + course instructor
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ['course', 'course.instructor'],
    });
    if (!lesson) {
      throw new NotFoundException(`No lesson found for this id ${id}`);
    }

    // ensure the instructor owns the course
    if (lesson.course.instructor.id !== instructor.id) {
      throw new ForbiddenException(
        'You are not allowed to update a lesson for this course',
      );
    }

    // merge updated fields
    Object.assign(lesson, body);

    // save updated lesson
    return await this.lessonRepo.save(lesson);
  }

  async deleteLesson(id: number, userId: number) {
    //find instructor
    const instructor = await this.userRepo.findOneBy({ id: userId });
    if (!instructor)
      throw new NotFoundException(`No user for this id ${userId}`);

    //find the lesson to delete
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ['course', 'course.instructor'],
    });
    if (!lesson)
      throw new NotFoundException(`No lesson found for this id ${id}`);

    //ensure that cours.instructor.id is the same as instructor.id
    if (lesson.course.instructor.id !== instructor.id)
      throw new ForbiddenException(
        'You are not allowed to create a lesson for this course',
      );
    await this.lessonRepo.delete({ id });
  }
}
