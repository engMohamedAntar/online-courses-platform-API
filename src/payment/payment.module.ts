import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { UserModule } from 'src/user/user.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

//payment.module
@Module({
  imports: [UserModule, EnrollmentModule],
  controllers: [PaymentController],
  providers: [PaymentService] 
})
export class PaymentModule {}
