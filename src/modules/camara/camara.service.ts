import { Injectable } from '@nestjs/common';
import * as NodeWebcam from 'node-webcam';

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
  async takePhoto(name: string) {
    const taked = await this.takePhotoAsync(name);
    return taked ? name : 'error al tomar la foto';
  }
}
