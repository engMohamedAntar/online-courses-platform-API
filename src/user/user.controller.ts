import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { UploadService } from '../upload/upload.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private uploadService: UploadService,
  ) {}

  //Profile routes
  @Roles('student', 'instructor', 'admin')
  @Get('me')
  async geMe(@Request() req) {
    return await this.userService.getMe(req.user.id);
  }

  @Roles('student', 'instructor', 'admin')
  @Patch('me')
  @UseInterceptors(FileInterceptor('profileImage'))
  async updateMe(@Request() req,@Body() body, @UploadedFile() file: Express.Multer.File) {
    //if there is a file then upload it on s3 then add its key to body
    if(file){
      const fileName= this.uploadService.buildFileKey('users', file.originalname);
      const key= await this.uploadService.upload(file, fileName);
      body.profileImageKey=key;
    }
    return await this.userService.updateMe(req.user.id, body);
  }

  //Admin routes
  @Roles('admin')
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Roles('admin')
  @Get('/:id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  async createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      //define where to upload the file (fileKey)
      const fileName = `courses/thumbnails/${randomUUID()}-${file.originalname}`;
      //upload the file and get its key
      const key = await this.uploadService.upload(file, fileName);
      //put the key the body and create the course
      body.profileImageKey = key;
    }

    return this.userService.createUser(body);
  }

  @Roles('admin')
  @Patch('/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.userService.updateUser(id, body);
  }

  @Roles('admin')
  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
