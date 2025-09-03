import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/createEnrollment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guards';

@UseGuards(AuthGuard('jwt'), RolesGuard )
@Controller('enrollment')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Roles('student')
  @Post()
  async createEnrollment(@Body() body: CreateEnrollmentDto, @Req() req) {
    return await this.enrollmentService.createEnrollment(body, req.user.id);
  }
  
  @Get('/:id')
  async getEnrollmentById(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.enrollmentService.getEnrollmentById(id, req.user.id);
  }
  
  @Roles('admin', 'instructor')
  @Get('/course/:courseId')
  async getCourseEnrollments(@Param('courseId', ParseIntPipe) courseId, @Req() req) {
    return await this.enrollmentService.getCourseEnrollments(courseId, req.user.id);
  }
 


}
