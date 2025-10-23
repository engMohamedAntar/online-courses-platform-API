import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    getUploadSignedUrl(fileName: any, contentType: any): Promise<{
        uploadUrl: string;
        key: string;
    }>;
}
