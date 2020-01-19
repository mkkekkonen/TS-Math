import Konva from 'konva';

import { round } from '../util';

export class Vector3 {
  constructor(public x = 0, public y = 0, public z = 0, public w = 1) {}

  static convertKonvaVector = (v: Konva.Vector2d) => {
    const { x, y } = v;
    return new Vector3(x, y, 0);
  }

  get asArray() {
    return [this.x, this.y, this.z, this.w];
  }

  multiply = (vector: Vector3) => new Vector3(
    this.x * vector.x,
    this.y * vector.y,
    this.z * vector.z,
  );

  distanceFrom = (vector: Vector3) => Math.sqrt(((vector.x - this.x) ** 2)
    + ((vector.y - this.y) ** 2));

  toString = () => `(${round(this.x)}, ${round(this.y)}, ${round(this.z)})`;
}
