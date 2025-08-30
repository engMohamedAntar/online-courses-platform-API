import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UpdateCourseDto } from './dtos/updateCourse.dto';

//course.controller.ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Roles('instructor')
  @Post()
  async createCourse(@Body() body, @Req() req) {
    const userId = req.user.id;
    console.log('reached here');

    console.log(userId);

    return await this.courseService.createCourse(body, userId);
  }

  @Get()
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Get(':id')
  async getOneCourse(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.getOneCourse(id);
  }

  @Roles('instructor')
  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseDto,
    @Req() req,
  ) {
    return await this.courseService.updateCourse(id, body, req.user.id);
  }

  @Roles('instructor', 'admin')
  @Delete(':id')
  async deleteCourse(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.courseService.deleteCourse(id, req.user.id, req.user.role);
  }
}
