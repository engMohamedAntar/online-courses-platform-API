import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/createLessonDto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UpdateLessonDto } from './dto/updateLessonDto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('lesson')
export class LessonController {
    constructor(private lessonService: LessonService){}

    @Roles('instructor')
    @Post()
    async createLesson(@Body() body: CreateLessonDto, @Req() req){
        return await this.lessonService.createLesson(body, req.user.id);
    }

    @Get('/course/:courseId')
    async getLessonsForCourse(@Param('courseId', ParseIntPipe) courseId:number ){
        return await this.lessonService.getLessonsForCourse(courseId);
    }

    @Get('/:id')
    async getLesson(@Param('id', ParseIntPipe) id: number){
        return this.lessonService.getLesson(id);
    }

    @Patch('/:id')
    async updateLesson(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateLessonDto, @Req() req){
        return this.lessonService.updateLesson(id, body, req.user.id);
    }

    @Delete('/:id')
    async deleteLesson(@Param('id', ParseIntPipe) id: number, @Req() req){
        await this.lessonService.deleteLesson(id, req.user.id);
    }

}
