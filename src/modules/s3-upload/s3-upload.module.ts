import { Module } from '@nestjs/common';
import { S3UploadService } from './s3-upload.service';
import { S3UploadController } from './s3-upload.controller';

@Module({
  controllers: [S3UploadController],
  providers: [S3UploadService]
})
export class S3UploadModule {}
