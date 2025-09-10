import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { UserModule } from 'src/user/user.module';

//enrollment.module
@Module({
  imports:[UserModule],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
  exports: [EnrollmentService]
})
export class EnrollmentModule {}
