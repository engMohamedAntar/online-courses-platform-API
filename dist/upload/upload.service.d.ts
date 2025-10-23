import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private configService;
    private s3Client;
    constructor(configService: ConfigService);
    upload(file: Express.Multer.File, fileName: string): Promise<string>;
    getDownloadSignedUrl(fileKey: string, expiresIn: number): Promise<string>;
    getUploadSignedUrl(fileName: string, contentType: string): Promise<{
        uploadUrl: string;
        key: string;
    }>;
    buildFileKey(folder: string, originalName: string): string;
}
