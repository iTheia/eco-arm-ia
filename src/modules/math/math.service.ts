import { ICord } from '@modules/ia/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  // retorna la informacion necesaria para el brazo
  // centro y angulo de la pinza
  getDataForArm(battery: any) {
    const { bottomVertex, topVertex } = this.getVertex(battery);
    const bottomMidle = this.getMiddle(bottomVertex[0], bottomVertex[1]);
    const topMidle = this.getMiddle(topVertex[0], topVertex[1]);
    const middle = this.getMiddle(topMidle, bottomMidle);
    const longestSide = this.getLongestSide(battery.boundingPoly.vertices);
    return {
      middle: middle,
      angle: this.getAngle(
        middle,
        this.getMiddle(longestSide[0], longestSide[1]),
      ),
    };
  }

  // BAJO PRUEBAS
  // se planea que retorne cual es el lado mas largo para que a la hora de calcular el angulo
  // de la pinza siempre lo tome desde el lado mas delgado para evitar problemas
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

    // ordena los puntos y retorna el punto con la cordenada mas corta
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
  // se calcula el angulo necesario para girar la garra tomando en cuenta el centro a un punto dado
  getAngle(center: ICord, end: ICord) {
    const dy = end.y - center.y;
    const dx = end.x - center.x;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta = 360 + theta;
    return theta;
  }
}
