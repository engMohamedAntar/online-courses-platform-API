import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dtos/createCourse.dto';
import { Course } from './course.entity';
import { User } from '../user/user.entity';
import { UpdateCourseDto } from './dtos/updateCourse.dto';

//user.service.ts
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createCourse(body: CreateCourseDto, userId: number) {
    const instructor = await this.userRepository.findOneBy({ id: userId });
    if (!instructor)
      throw new NotFoundException(`No user found for this id ${instructor}`);

    const course = this.courseRepo.create({ ...body, instructor });
    return await this.courseRepo.save(course);
  }

  async getAllCourses() {
    const courses = await this.courseRepo.find();
    return courses;
  }

  async getOneCourse(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['instructor'],
    });
    if (!course)
      throw new NotFoundException(`No course found for this id ${id}`);
    return course;
  }

  async updateCourse(id: number, body: UpdateCourseDto, userId: number) {
    let course = await this.courseRepo.findOne({
      where: { id },
      relations: ['instructor'],
    });
    if (!course)
      throw new NotFoundException(`No course found for this id ${id}`);

    //ownership chick
    if (userId !== course.instructor.id)
      throw new ForbiddenException('You are not allowed to update this course');

    course = { ...course, ...body };
    return await this.courseRepo.save(course);
  }

  async deleteCourse(id: number, userId, role) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['instructor'],
    });
    if (!course)
      throw new NotFoundException(`No course found for this id ${id}`);

    //ownership check
    if (role !== 'admin' && course.instructor.id !== userId)
      throw new ForbiddenException('You are not allowed to delete this course');
    await this.courseRepo.delete({ id });
  }
}
