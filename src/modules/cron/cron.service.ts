import { CamaraService } from '@modules/camara/camara.service';
import { IaService } from '@modules/ia/ia.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Axios from 'axios';
import fs from 'fs';

@Injectable()
export class CronService {
  // constructor(
  //   private readonly iaService: IaService,
  //   private camaraService: CamaraService,
  // ) {}
  // detected = false;
  // private readonly logger = new Logger(CronService.name);
  // @Cron('0/6 * * * * *')
  // async handleCron() {
  //   this.logger.log('running');
  //   if (!this.detected) {
  //     const photoName = await this.camaraService.takePhoto();
  //     this.logger.log(photoName);
  //     const data = await this.iaService.detect(photoName);
  //     this.logger.log(data);
  //     if (!data) {
  //       fs.unlinkSync(`./static/images/${photoName}`);
  //     } else {
  //     }
  //   }
  // }
}
