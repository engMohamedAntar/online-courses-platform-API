// payment.controller.ts
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';

//payment.controller.ts
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
  ) {}

  // ✅ Step 1: Create Payment + Checkout Session
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student') 
  @Post(':courseId')
  async createCheckoutSession(@Param('courseId') courseId: number, @Req() req) {
    console.log('entered the createCheckoutSession controller');
    
    //Get user and course and validate their existance
    const user = await this.userRepo.findOneBy({ id: req.user.id });
    const course = await this.courseRepo.findOneBy({ id: courseId });
    if (!user || !course) {
      throw new NotFoundException('user or course not found');
    }

    // Create payment record
    const payment = await this.paymentService.createPayment(user, course);

    // Create Stripe session
    return await this.paymentService.createSession(payment.id, user, course);
  }

  // ✅ Step 2: Stripe Webhook
  @Post('webhook')
  async stripeWebhook(@Req() req) {
    try {
      console.log('entered the webhook controller');
      
      return await this.paymentService.handleWebhook(req);
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`)
    }
  }

  @Get('success')
  successPage(){
    return 'Payment is success'
  }
  @Get('cancel')
  cancelPage(){
    return 'Payment canceled'
  }
}
