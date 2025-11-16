import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { CreateCourseDto } from './dtos/createCourse.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { CreateCourseWithFileDto } from './dtos/createCourseWithFile.dto';

//course.controller.ts
@Controller('course')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private uploadService: UploadService,
  ) {}

  @ApiSecurity('bearer')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCourseWithFileDto })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('instructor')
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createCourse(
    @Body() body: CreateCourseDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      //define where to upload the file (fileKey)
      const fileName = this.uploadService.buildFileKey(
        'courses',
        file.originalname,
      );
      //upload the file and get its key
      const key = await this.uploadService.upload(file, fileName);
      //put the key the body and create the course
      body.thumbnailKey = key;
    }
    return await this.courseService.createCourse(body, req.user.id);
  }

  @Get()
  @ApiQuery({
    name: 'title',
    required: false,
  })
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'courses fetched successfully' })
  async getAllCourses(@Query('title') title: string) {
    return await this.courseService.getAllCourses(title);
  }

  @Get(':id')
  async getOneCourse(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.getOneCourse(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('instructor')
  @Patch(':id')
  @ApiSecurity('bearer')
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
