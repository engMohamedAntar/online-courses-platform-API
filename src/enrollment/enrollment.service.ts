import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment, PaymentStatus } from './enrollment.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { UpdateEnrollmentStatusDto } from './dto/updateStatus.dto';
import { NotificationsService } from '../notifications/notifications.service';

//enrollment.service
@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    private notificationsService: NotificationsService,
  ) {}

  // enrollment.service.ts

  //Will be called in paymentService (inside handleWebhook) when payment is success
  async createEnrollmentAfterPayment(user: User, course: Course) {    
    const existing = await this.enrollmentRepo.findOne({
      where: { user: { id: user.id }, course: { id: course.id } },
    });
    if (existing) return existing; // already enrolled

    const enrollment = this.enrollmentRepo.create({
      user,
      course,
      paymentStatus: PaymentStatus.SUCCESS,
    });
    await this.notificationsService.sendMail({
      to: user.email,
      subject: 'Enrollment Status',
      message: `Hi, ${user.name}. You have successfully enrolled in course ${course.title}`,
    });
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
      relations: ['user'],
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

  async updateEnrollmentStatus(
    enrollmentId: number,
    body: UpdateEnrollmentStatusDto,
  ) {
    //get enrollment
    const enrollment = await this.enrollmentRepo.findOneBy({
      id: enrollmentId,
    });
    if (!enrollment)
      throw new NotFoundException(
        `No enrollment found for this id ${enrollmentId}`,
      );

    enrollment.paymentStatus = body.status;
    return await this.enrollmentRepo.save(enrollment);
  }
}
