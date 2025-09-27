import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';

//upload.controller
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @Roles('instructor')
  @Get('signed-url')
  async getUploadSignedUrl(
    @Query('fileName') fileName,
    @Query('contentType') contentType,
  ) {
    return await this.uploadService.getUploadSignedUrl(fileName, contentType);
  }
}
