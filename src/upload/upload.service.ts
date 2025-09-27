import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

//upload.service.ts
@Injectable()
export class UploadService {
  private s3Client: S3Client;
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client();
  }

  async upload(file: Express.Multer.File, fileName: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await this.s3Client.send(command);

      return fileName ; //save this key in the database as a ref to the file.
    } catch (err) {
      throw new InternalServerErrorException(`File creation failed: ${err}`);
    }
  }

  async getDownloadSignedUrl(fileKey: string, expiresIn: number) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: fileKey,
      });
      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (err) {
      throw new InternalServerErrorException(
        `Can't create a download SignedUrl: ${err}`,
      );
    }
  }

  async getUploadSignedUrl(fileName: string, contentType: string) {
    try {
      const key = `lessons/${randomUUID()}-${fileName}`;
      const command = new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: key,
        ContentType: contentType,
      });
      const uploadUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });
      return { uploadUrl, key };
    } catch (err) {
      throw new InternalServerErrorException(
        `Can't create an upload SignedUrl: ${err}`,
      );
    }
  }

  buildFileKey(folder: string, originalName: string) {
  return `${folder}/${randomUUID()}-${originalName}`;
}
}
