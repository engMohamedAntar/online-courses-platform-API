// update-enrollment-status.dto.ts
import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../enrollment.entity';

//UpdateEnrollmentStatusDto
export class UpdateEnrollmentStatusDto {
  @IsEnum(PaymentStatus, {
    message: 'status must be one of: pending, success, failed',
  })
  status: PaymentStatus;
}
