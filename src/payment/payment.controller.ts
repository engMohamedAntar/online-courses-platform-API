// payment.controller.ts
import { Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
  ) {}

  // ✅ Step 1: Create Payment + Checkout Session
  @UseGuards(AuthGuard('jwt')) // protect it if user must be logged in
  @Post(':courseId')
  async createCheckoutSession(@Param('courseId') courseId: number, @Req() req) {
    const userId = req.user.id; // assuming JWT adds this
    const user = await this.userRepo.findOneBy({ id: userId });
    const course = await this.courseRepo.findOneBy({ id: courseId });

    if (!user || !course) {
      throw new Error('Invalid user or course');
    }

    // Create payment record
    const payment = await this.paymentService.createPayment(user, course);

    // Create Stripe session
    const session = await this.paymentService.createSession(
      payment.id,
      user,
      course,
    );

    return { url: session.url }; // return session url to frontend
  }

  // ✅ Step 2: Stripe Webhook
  @Post('webhook')
  async stripeWebhook(@Req() req, @Res() res) {
    try {
      const result = await this.paymentService.handleWebhook(req);
      return res.json(result);
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
