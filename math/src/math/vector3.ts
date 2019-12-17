export class Vector3 {
  constructor(public x = 0, public y = 0, public z = 0, public w = 1) {};

  get asArray() {
    return [this.x, this.y, this.z, this.w];
  }
}
