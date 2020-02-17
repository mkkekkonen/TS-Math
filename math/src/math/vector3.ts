import Konva from 'konva';

import { round, degreesToRadians } from '../util';
import { PolarCoordinates } from '.';

export class Vector3 {
  constructor(public x = 0, public y = 0, public z = 0, public w = 1) {}

  static convertKonvaVector = (v: Konva.Vector2d) => {
    const { x, y } = v;
    return new Vector3(x, y, 0);
  }

  static fromPolarCoordinates = (polarCoordinates: PolarCoordinates) => new Vector3(
    polarCoordinates.radius * Math.cos(degreesToRadians(polarCoordinates.theta)),
    polarCoordinates.radius * Math.sin(degreesToRadians(polarCoordinates.theta)),
  );

  get asArray() {
    return [this.x, this.y, this.z, this.w];
  }

  get length() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
  }

  add = (vector: Vector3) => new Vector3(
    this.x + vector.x,
    this.y + vector.y,
    this.z + vector.z,
  );

  subtract = (vector: Vector3) => new Vector3(
    this.x - vector.x,
    this.y - vector.y,
    this.z - vector.z,
  );

  multiply = (vector: Vector3) => new Vector3(
    this.x * vector.x,
    this.y * vector.y,
    this.z * vector.z,
  );

  multiplyScalar = (scalar: number) => new Vector3(
    this.x * scalar,
    this.y * scalar,
    this.z * scalar,
  );

  divideScalar = (scalar: number) => new Vector3(
    this.x / scalar,
    this.y / scalar,
    this.z / scalar,
  );

  clone = () => new Vector3(this.x, this.y, this.z);

  distanceFrom = (vector: Vector3) => Math.sqrt(((vector.x - this.x) ** 2)
    + ((vector.y - this.y) ** 2));

  toString = () => `(${round(this.x)}, ${round(this.y)}, ${round(this.z)})`;
}
