import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CamaraService } from './camara.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('camara')
export class CamaraController {
  constructor(private camaraService: CamaraService) {}

  @Get('take-photo')
  async takePhoto() {
    return await this.camaraService.takePhoto();
  }

  @Get('photo-dimensions/:name')
  async getDimensions(@Param('name') name: string) {
    return await this.camaraService.getDimensions(name);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
