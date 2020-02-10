import { Vector3 } from '../math';

export class TimeKinematics2D {
  position: Vector3;
  velocity: Vector3;

  totalTime = 0;

  constructor(
    private initialPosition = new Vector3(),
    private initialVelocity = new Vector3(),
    public acceleration = new Vector3(),
  ) {
    this.position = initialPosition;
    this.velocity = initialVelocity;
  }

  reset = (position = new Vector3(), velocity = new Vector3(), acceleration = new Vector3()) => {
    this.initialPosition = position;
    this.position = position;

    this.initialVelocity = velocity;
    this.velocity = velocity;

    this.acceleration = acceleration;

    this.totalTime = 0;
  }

  update = (time: number) => {
    this.totalTime += time;

    const sx = (this.initialVelocity.x * this.totalTime)
      + (0.5 * this.acceleration.x * (this.totalTime ** 2));
    const sy = (this.initialVelocity.y * this.totalTime)
      + (0.5 * this.acceleration.y * (this.totalTime ** 2));
    this.position = new Vector3(sx, sy);

    const vx = this.initialVelocity.x
      + (this.acceleration.x * this.totalTime);
    const vy = this.initialVelocity.y
      + (this.acceleration.y * this.totalTime);
    this.velocity = new Vector3(vx, vy);
  }

  toString = () => {
    const strs = [];
    strs.push('- TimeKinematics2D');
    strs.push(`~ position: ${this.position.toString()}`);
    strs.push(`~ velocity: ${this.velocity.toString()}`);
    strs.push(`~ accelerations: ${this.acceleration.toString()}`);
    return strs.join('\n');
  }
}
