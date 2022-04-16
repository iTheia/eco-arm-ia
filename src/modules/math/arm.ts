import { ICord } from '@modules/ia/types';
type arms = {
  atlas: number;
  codo: number;
};

export class Arm {
  private arms: arms = {
    atlas: 10.5,
    codo: 14,
  };
  private baseCords: ICord = {
    x: 0,
    y: 0,
  };
  private atlasCords: ICord;
  private range: number = 180;
  private valueRange: number = 500;
  private height: number = 0;
  constructor() {
    this.atlasCords = {
      x: 0,
      y: this.height,
      r: this.arms.atlas,
    };
  }
  getAngles(point: ICord) {
    const base = this.caltAngle(point, this.baseCords);
    const a = this.baseCords.x - point.x;
    const b = this.baseCords.y - point.y;
    const hypot = Math.sqrt(a * a + b * b);

    console.log(hypot);
    const objectiveCords = {
      x: hypot,
      y: 0,
      r: this.arms.codo,
    };
    const intersectionPoint = this.calcIntersection(
      this.atlasCords,
      objectiveCords,
    );
    if (!intersectionPoint) {
      return false;
    }
    const { alpha: atlas, betta: codo } = this.calcAnglesOfTriangle(
      objectiveCords,
      intersectionPoint,
      this.atlasCords,
    );
    console.log(base, atlas, codo);
    console.log({
      base: this.convertAngle(base),
      atlas: this.convertAngle(atlas),
      codo: this.convertAngle(this.getInverseAngle(codo)),
    });
    return {
      base: this.convertAngle(base),
      atlas: this.convertAngle(atlas),
      codo: this.convertAngle(this.getInverseAngle(codo)),
    };
  }
  private getInverseAngle(angle: number) {
    return this.range - angle;
  }
  private convertAngle(angle: number) {
    // let ratio = (angle * this.valueRange) / this.range;

    let ratio = (angle * 230) / 90;
    return (ratio - 100).toFixed(2);
  }
  private caltAngle(point: ICord, origin: ICord) {
    const deltaX = point.x - origin.x;
    const deltaY = point.y - origin.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }

  private lengthSquare(p1: ICord, p2: ICord) {
    let xDiff = p1.x - p2.x;
    let yDiff = p1.y - p2.y;
    return xDiff * xDiff + yDiff * yDiff;
  }

  private calcAnglesOfTriangle(A: ICord, B: ICord, C: ICord) {
    let a2 = this.lengthSquare(B, C);
    let b2 = this.lengthSquare(A, C);
    let c2 = this.lengthSquare(A, B);

    // length of sides be a, b, c
    let a = Math.sqrt(a2);
    let b = Math.sqrt(b2);
    let c = Math.sqrt(c2);

    // From Cosine law
    let alpha = Math.acos((b2 + c2 - a2) / (2 * b * c));
    let betta = Math.acos((a2 + c2 - b2) / (2 * a * c));
    let gamma = Math.acos((a2 + b2 - c2) / (2 * a * b));

    // Converting to degree
    alpha = (alpha * 180) / Math.PI;
    betta = (betta * 180) / Math.PI;
    gamma = (gamma * 180) / Math.PI;
    return {
      alpha,
      betta,
      gamma,
    };
  }
  private calcIntersection(pointA: ICord, pointB: ICord) {
    let a: number,
      dx: number,
      dy: number,
      d: number,
      h: number,
      rx: number,
      ry: number,
      x2: number,
      y2: number;

    dx = pointB.x - pointA.x;
    dy = pointB.y - pointA.y;

    d = Math.hypot(dx, dy);

    if (d > pointA.r + pointB.r || d < Math.abs(pointA.r - pointB.r)) {
      return false;
    }
    a = (pointA.r * pointA.r - pointB.r * pointB.r + d * d) / (2.0 * d);

    x2 = pointA.x + (dx * a) / d;
    y2 = pointA.y + (dy * a) / d;

    h = Math.sqrt(pointA.r * pointA.r - a * a);

    rx = -dy * (h / d);
    ry = dx * (h / d);

    return { x: x2 + rx, y: y2 + ry };
  }
}
