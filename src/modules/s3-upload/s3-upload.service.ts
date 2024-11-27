import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { ErrorHelper } from 'src/utils';
dotenv.config();

@Injectable()
export class S3UploadService {
  private s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  async upload(fileName: string, file: Buffer) {
    try {
      const result = await this.s3
        .upload({
          Bucket: process.env.S3_BUCKET_NAME,
          Body: file,
          Key: `uploads/${fileName}`,
          ACL: 'public-read',
          ContentDisposition: 'inline',
        })
        .promise();
      return result;
    } catch (e) {
      ErrorHelper.BadRequestException(e.message);
    }
  }
}
