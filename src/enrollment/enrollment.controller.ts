import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch, 
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guards';
import { UpdateEnrollmentStatusDto } from './dto/updateStatus.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('enrollment')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get('/:id')
  async getEnrollmentById(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.enrollmentService.getEnrollmentById(id, req.user.id);
  }

  @Roles('admin', 'instructor')
  @Get('/course/:courseId')
  async getCourseEnrollments(
    @Param('courseId', ParseIntPipe) courseId,
    @Req() req,
  ) {
    return await this.enrollmentService.getCourseEnrollments(
      courseId,
      req.user.id,
    );
  }

  @Roles('admin', 'student')
  @Get('/user/:userId')
  async getUserEnrollments(@Param('userId', ParseIntPipe) userId, @Req() req) {
    return await this.enrollmentService.getUserEnrollments(userId, req.user);
  }

  @Roles('admin')
  @Patch(':id')
  async updateEnrollmentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEnrollmentStatusDto,
  ) {
    return await this.enrollmentService.updateEnrollmentStatus(id, body);
  }
}
