import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentProvider, PaymentStatus } from './payment.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { EnrollmentService } from '../enrollment/enrollment.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

//payment.service
@Injectable()
export class PaymentService {
  constructor( 
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    private enrollmentService: EnrollmentService,
  ) {}

  //Step 1: Create a local Payment record
  async createPayment(user: User, course: Course): Promise<Payment> {
    const payment = this.paymentRepo.create({
      user,
      course,
      amount: course.price,
      currency: 'EGP',
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.PENDING,
    });    
    return await this.paymentRepo.save(payment);
  }

  //Step 2: Create a Stripe checkout session (Use the paymentId as the client_reference_id)
  async createSession(paymentId: number, user: User, course: Course) {    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'egp',
            product_data: { name: course.title },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://online-course-platform-api.vercel.app/payment/success`,
      cancel_url: `https://online-course-platform-api.vercel.app/payment/cancel`,
      client_reference_id: paymentId.toString(),
      customer_email: user.email,
    });

    console.log('createSession');
    return session;
  }

  //Step 3: Handle Stripe webhook
  async handleWebhook(req: any) {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      throw new Error(`Stripe Error: ${err}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const paymentId = Number(session.client_reference_id);

      const payment = await this.paymentRepo.findOne({
        where: { id: paymentId },
        relations: ['user', 'course'],
      });
      if (!payment) throw new NotFoundException('Payment not found');

      // update payment
      payment.status = PaymentStatus.SUCCESS;
      await this.paymentRepo.save(payment);

      // ✅ auto-create enrollment here
      await this.enrollmentService.createEnrollmentAfterPayment(
        payment.user,
        payment.course,
      );
    }

    return { received: true };
  }
}
