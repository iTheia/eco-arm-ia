import { google } from '@google-cloud/vision/build/protos/protos';
import { ICord } from '@modules/ia/types';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Arm } from './arm';
@Injectable()
export class MathService {
  constructor(@Inject('ARM') private readonly arm: Arm) {}

  getDataForArm(battery: google.cloud.vision.v1.IEntityAnnotation) {
    const middle = this.convertCordsToCm(this.getMiddle(battery));
    console.log('punto medio', middle);
    const angles = this.arm.getAngles(middle);
    if (!angles) {
      throw new HttpException('Valores invalidos', 400);
    }
    const { atlas, base, codo } = angles;
    return `${base},${atlas},${codo}`;
  }
  convertCordsToCm(cords: ICord) {
    const height = 823;
    const width = 1790;
    const cmX = 15;
    const cmY = 7;
    return {
      x: (cords.x - width / 2) / (width / cmX / 2),
      y: (height - cords.y) / (height / cmY),
    };
  }
  // regresa el centro dado dos puntos
  getMiddle(battery: google.cloud.vision.v1.IEntityAnnotation) {
    const { bottomVertex, topVertex } = this.getVertex(battery);
    const calcPoint = (start: ICord, end: ICord) => ({
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    });
    return calcPoint(
      calcPoint(bottomVertex[0], bottomVertex[1]),
      calcPoint(topVertex[0], topVertex[1]),
    );
  }

  // calcula los dos puntos superiores e inferiores
  getVertex(battery: google.cloud.vision.v1.IEntityAnnotation) {
    const { vertices } = battery.boundingPoly;
    const arr = [...vertices];
    const max = Math.max(...arr.map((el) => el.y));
    const maxItem = arr.find((item) => item.y === max);
    arr.splice(
      arr.findIndex((item) => item.y === max),
      1,
    );
    const secondMax = Math.max(...arr.map((el) => el.y));
    const secondMaxItem = arr.find((item) => item.y === secondMax);
    const topVertex = [maxItem, secondMaxItem];
    const bottomVertex = [
      ...vertices.filter((item) => !topVertex.includes(item)),
    ];
    return { topVertex, bottomVertex } as {
      topVertex: ICord[];
      bottomVertex: ICord[];
    };
  }
  getDataForArmMock(cords: ICord) {
    const angles = this.arm.getAngles(cords);
    if (!angles) {
      throw new HttpException('Valores invalidos', 400);
    }
    const { atlas, base, codo } = angles;
    return `${base},${atlas},${codo}`;
  }
}
