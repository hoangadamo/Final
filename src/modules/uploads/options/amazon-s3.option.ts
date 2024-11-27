import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

export const amazonS3Options = {
  S3: new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  }),
  bucket: process.env.S3_BUCKET_NAME,
};
