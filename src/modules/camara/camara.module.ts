import { Module } from '@nestjs/common';
import { CamaraService } from './camara.service';
import { CamaraController } from './camara.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: (__: any, _, callback) => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            let path = year + month;
            mkdirSync(`./static/images/${path}`, { recursive: true });
            callback(null, `./static/images/${path}`);
          },
          filename: (_, file, callback) => {
            callback(null, file.originalname);
          },
        }),
      }),
    }),
  ],
  providers: [CamaraService],
  controllers: [CamaraController],
  exports: [CamaraService],
})
export class CamaraModule {}
