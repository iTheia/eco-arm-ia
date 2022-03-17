import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CamaraService } from './camara.service';
import { v4 as uuid } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('camara')
export class CamaraController {
  constructor(private camaraService: CamaraService) {}

  @Get('take-photo')
  async takePhoto() {
    return await this.camaraService.takePhoto(uuid());
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
