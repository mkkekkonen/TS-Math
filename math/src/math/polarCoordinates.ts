export class PolarCoordinates {
  constructor(public radius: number, public theta: number) {}

  clone = () => new PolarCoordinates(this.radius, this.theta);
}
