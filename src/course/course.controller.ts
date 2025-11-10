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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guards';
import { UpdateCourseDto } from './dtos/updateCourse.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

//course.controller.ts
@Controller('course')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private uploadService: UploadService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor')
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createCourse(
    @Body() body,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    //define where to upload the file (fileKey)
    const fileName = this.uploadService.buildFileKey(
      'courses',
      file.originalname,
    );
    //upload the file and get its key
    const key = await this.uploadService.upload(file, fileName);
    //put the key the body and create the course
    body.thumbnailKey = key;
    return await this.courseService.createCourse(body, req.user.id);
  }

  @Get()
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Get(':id')
  async getOneCourse(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.getOneCourse(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('instructor')
  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseDto,
    @Req() req,
  ) {
    return await this.courseService.updateCourse(id, body, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('instructor', 'admin')
  @Delete(':id')
  async deleteCourse(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.courseService.deleteCourse(
      id,
      req.user.id,
      req.user.role,
    );
  }
}
