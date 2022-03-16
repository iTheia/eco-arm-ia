import { Injectable } from '@nestjs/common';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as fs from 'fs';
import * as NodeWebcam from 'node-webcam';
import { ICord } from './types';
import { batteries } from '@const/data';
import { google } from '@google-cloud/vision/build/protos/protos';

@Injectable()
export class IaService {
  private client: ImageAnnotatorClient;
  constructor(private config: ConfigService) {
    this.client = new vision.ImageAnnotatorClient({
      ...this.config.get('vision'),
    });
  }

  async detect(res: Response) {
    const photoName = '';
    // await TakePhoto(photoName);
    const file = fs.readFileSync('11.jpg');
    let [detection] = await this.client.logoDetection(file);
    const { logoAnnotations } = detection;
    const foundBatteries = logoAnnotations.filter((el) =>
      batteries.includes(el.description),
    );
    let cords = [];
    foundBatteries.forEach((battery) => {
      const { bottomVertex, topVertex } = this.getVertex(battery);
      const bottomMidle = this.getMiddle(bottomVertex[0], bottomVertex[1]);
      const topMidle = this.getMiddle(topVertex[0], topVertex[1]);
      const middle = this.getMiddle(topMidle, bottomMidle);
      const longestSide = this.getLongestSide(battery.boundingPoly.vertices);
      console.log(longestSide);
      cords.push({
        middle: middle,
        angle: this.getAngle(
          middle,
          this.getMiddle(longestSide[0], longestSide[1]),
        ),
      });
    });
    res.send({
      cords,
    });
  }
  getLongestSide(cords: any[]) {
    let sides = new Map();
    for (let index = 0; index < cords.length - 1; index++) {
      const cord1 = cords[index];
      for (let j = 0; j < cords.length - 1; j++) {
        const cord2 = cords[j];
        const distance = Math.sqrt(
          Math.pow(cord1.x - cord2.x, 2) + Math.pow(cord1.y - cord2.y, 2),
        );
        if (distance === 0) continue;
        sides.set(distance, [cord1, cord2]);
      }
    }
    console.log(sides.entries());
    return [...sides.entries()].sort((a, b) => {
      if (a[0] > b[0]) {
        return -1;
      }
      if (b[0] > a[0]) {
        return 1;
      }
      return 0;
    })[2][1];
  }
  getMiddle(start: ICord, end: ICord) {
    return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  }
  getVertex(battery: any) {
    const { vertices } = battery.boundingPoly;
    const topVertex = this.twoHighest(vertices);

    const bottomVertex = [
      ...vertices.filter((item) => !topVertex.includes(item)),
    ];
    return { topVertex, bottomVertex };
  }
  twoHighest(original: ICord[]) {
    const arr = [...original];
    const max = Math.max(...arr.map((el) => el.y));
    const maxItem = arr.find((item) => item.y === max);
    arr.splice(
      arr.findIndex((item) => item.y === max),
      1,
    );
    const secondMax = Math.max(...arr.map((el) => el.y));
    const secondMaxItem = arr.find((item) => item.y === secondMax);
    return [maxItem, secondMaxItem];
  }
  getAngle(center: ICord, end: ICord) {
    const dy = end.y - center.y;
    const dx = end.x - center.x;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta = 360 + theta;
    return theta;
  }

  TakePhoto(name: string) {
    const opts = {
      width: 1280,
      height: 720,
      quality: 100,
      frames: 60,
      delay: 0,
      saveShots: true,
      output: 'jpeg',
      device: false,
      callbackReturn: 'location',
      verbose: false,
    };
    return new Promise((res, rej) => {
      const Webcam = NodeWebcam.create(opts);
      Webcam.capture(name, (err, data) => {
        if (err) rej(err);
        res(true);
      });
    });
  }
}
