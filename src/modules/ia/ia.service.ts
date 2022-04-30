import { Injectable } from '@nestjs/common';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { ConfigService } from '@nestjs/config';
import { batteries } from '@const/data';
import { MathService } from '@modules/math/math.service';
import { ICord } from './types';
@Injectable()
export class IaService {
  private client: ImageAnnotatorClient;
  // importa la configuracion y el servicio de math
  constructor(private config: ConfigService, private mathService: MathService) {
    // crea el cliente de google a partir de la configuracion en src/config/vision
    this.client = new vision.ImageAnnotatorClient({
      ...this.config.get('vision'),
    });
  }
  async detect(name: string) {
    let [detection] = await this.client.logoDetection(
      `./static/images/${name}`,
    );
    const { logoAnnotations } = detection;
    const foundBatteries = logoAnnotations.filter((el) =>
      batteries.includes(el.description),
    );
    let response = [];
    foundBatteries.forEach((battery) => {
      response.push(this.mathService.getDataForArm(battery));
    });
    return response[0];
  }
  async detectTest(cords: ICord) {
    return this.mathService.getDataForArmMock(cords);
  }
}
