"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
let UploadService = class UploadService {
    configService;
    s3Client;
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client();
    }
    async upload(file, fileName) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.configService.get('AWS_BUCKET'),
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            });
            await this.s3Client.send(command);
            return fileName;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`File creation failed: ${err}`);
        }
    }
    async getDownloadSignedUrl(fileKey, expiresIn) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.configService.get('AWS_BUCKET'),
                Key: fileKey,
            });
            return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Can't create a download SignedUrl: ${err}`);
        }
    }
    async getUploadSignedUrl(fileName, contentType) {
        try {
            const key = this.buildFileKey('lessons', fileName);
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.configService.get('AWS_BUCKET'),
                Key: key,
                ContentType: contentType,
            });
            const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                expiresIn: 3600,
            });
            return { uploadUrl, key };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Can't create an upload SignedUrl: ${err}`);
        }
    }
    buildFileKey(folder, originalName) {
        return `${folder}/${(0, crypto_1.randomUUID)()}-${originalName}`;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map