import { Injectable } from '@nestjs/common';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { batteries } from '@const/data';
import { MathService } from '@modules/math/math.service';

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
    return this.mathService.getDataForArm({});
    let [detection] = await this.client.logoDetection(
      `./static/images/${name}`,
    );
    const { logoAnnotations } = detection;
    const foundBatteries = logoAnnotations.filter((el) =>
      batteries.includes(el.description),
    );
    let cords = [];
    foundBatteries.forEach((battery) => {
      cords.push(this.mathService.getDataForArm(battery));
    });
    return cords;
  }
}
