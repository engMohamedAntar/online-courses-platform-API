import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/createEnrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { UpdateEnrollmentStatusDto } from './dto/updateStatus.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}
  async createEnrollment(body: CreateEnrollmentDto, userId: number) {
    // Get user and verify its existance
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(`No user found for this id ${userId}`);

    // Get course and verify its existance
    const course = await this.courseRepo.findOneBy({ id: body.courseId });

    if (!course)
      throw new NotFoundException(
        `No course found for this id ${body.courseId}`,
      );

    // Check if user is already enrolled in this course (enrollment already exist)
    const enrollmentExists = await this.enrollmentRepo.findOne({
      where: { user: { id: user.id }, course: { id: body.courseId } },
    });
    if (enrollmentExists)
      throw new ConflictException(
        `User with id ${user.id} already enrolled in course ${course.id}`,
      );

    // Verify PaymentStatus is success (ignore this step for now)

    // Save the enrollment and return it.
    const enrollment = this.enrollmentRepo.create({ user, course });
    return await this.enrollmentRepo.save(enrollment);
  }

  async getEnrollmentById(id: number, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(`No user found for this id ${userId}`);

    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['user', 'course', 'course.instructor'],
    });
    if (!enrollment)
      throw new NotFoundException(`No enrollment found for this id ${id}`);

    //If user role is student, ensure that it's his own enrollment.
    if (user.role === UserRole.STUDENT && enrollment.user.id !== user.id)
      throw new ForbiddenException(
        `You are not allowed to see this enrollment`,
      );

    //If user role is instructor, ensure that enrollment is on his course
    if (
      user.role === UserRole.INSTRUCTOR &&
      enrollment.course.instructor.id !== user.id
    )
      throw new ForbiddenException(
        `You are not allowed to see this enrollment`,
      );

    return enrollment;
  }

  async getCourseEnrollments(courseId: number, userId: number) {
    //get user
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(`No user found for this id ${userId}`);

    //get course
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      relations: ['instructor'],
    });
    if (!course)
      throw new NotFoundException(`No course found for this id ${courseId}`);

    //if user is instructor then ensure that he owns this course
    if (user.role === UserRole.INSTRUCTOR && course.instructor.id !== user.id)
      throw new ForbiddenException(
        `You are not allowed show enrollments of this course`,
      );
    //get enrollmets of the course and return it.
    return await this.enrollmentRepo.find({
      where: { course: { id: courseId } },
    });
  }

  async getUserEnrollments(
    userId: number,
    loggedInUser: { id: number; role: UserRole },
  ) {
    //If user role is student, then ensure that he shows his own enrollments
    if (loggedInUser.role === UserRole.STUDENT && loggedInUser.id !== userId)
      throw new ForbiddenException(
        `You are not allowed to show enrollments of this user`,
      );

    //get enrollmets of the loggedIn user return it.
    return await this.enrollmentRepo.find({
      where: { user: { id: userId } },
    });
  }

  async updateEnrollmentStatus(enrollmentId:number ,body: UpdateEnrollmentStatusDto){
    //get enrollment
    const enrollment= await this.enrollmentRepo.findOneBy({id:enrollmentId});
    if(!enrollment)
      throw new NotFoundException(`No enrollment found for this id ${enrollmentId}`);

    enrollment.paymentStatus= body.status;
    return await this.enrollmentRepo.save(enrollment);
  }
}
