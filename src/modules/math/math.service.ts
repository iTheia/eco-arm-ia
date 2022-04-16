import { ICord } from '@modules/ia/types';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Arm } from './arm';

@Injectable()
export class MathService {
  constructor(@Inject('ARM') private readonly arm: Arm) {}
  // retorna la informacion necesaria para el brazo
  // centro y angulo de la pinza
  getDataForArm(battery: any) {
    const { bottomVertex, topVertex } = this.getVertex(battery);
    const bottomMidle = this.getMiddle(bottomVertex[0], bottomVertex[1]);
    const topMidle = this.getMiddle(topVertex[0], topVertex[1]);
    const middle = this.getMiddle(topMidle, bottomMidle);
    const angles = this.arm.getAngles(middle);
    if (!angles) {
      return '';
    }
    const { atlas, base, codo } = angles;
    return `${base},${atlas},${codo}`;
  }
  getDataForArmMock(cords: ICord) {
    const angles = this.arm.getAngles(cords);
    if (!angles) {
      return 'valores invalidos';
    }
    const { atlas, base, codo } = angles;
    return `${base},${atlas},${codo}`;
  }
  // regresa el centro dado dos puntos
  getMiddle(start: ICord, end: ICord) {
    return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  }

  // calcula los dos puntos superiores e inferiores
  getVertex(battery: any) {
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
    return { topVertex, bottomVertex };
  }
}
