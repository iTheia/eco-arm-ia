import { HttpException, Injectable } from '@nestjs/common';
import * as NodeWebcam from 'node-webcam';
import { v4 as uuid } from 'uuid';
import sizeOf from 'image-size';

@Injectable()
export class CamaraService {
  config = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 30,
    delay: 0,
    saveShots: true,
    device: false,
    callbackReturn: 'location',
    verbose: false,
  };
  // aqui accede a la camara y toma la foto
  private takePhotoAsync(name: string) {
    return new Promise((res, rej) => {
      const Webcam = NodeWebcam.create(this.config);
      const path = `./static/images/${name}.jpg`;
      Webcam.capture(path, (err, data) => {
        if (err) rej(err);
        res(true);
      });
    });
  }
  // esto es para llamar lo de arriba
  async takePhoto() {
    const name = uuid();
    const taked = await this.takePhotoAsync(name);
    if (!taked) {
      throw new HttpException('error taking the photo', 400);
    }
    return name + '.jpg';
  }
  async getDimensions(name: string) {
    return sizeOf(`./static/images/${name}`);
  }
}
