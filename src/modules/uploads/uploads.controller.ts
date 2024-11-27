import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { multerOptions } from './options/multer.option';
import { UploadService } from './uploads.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/amazon')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', multerOptions.imageFilter))
  async amazonUpload(@UploadedFile() file) {
    return await this.uploadService.amazonUpload(file);
  }
}
