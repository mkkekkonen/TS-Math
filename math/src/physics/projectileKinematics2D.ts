import { Vector3 } from '../math';

const accelerationGravity = new Vector3(0, -9.81);

export class ProjectileKinematics2D {
  position: Vector3;
  velocity: Vector3;

  totalTime = 0;

  constructor(
    public initialPosition = new Vector3(),
    public initialVelocity = new Vector3(),
  ) {
    this.position = initialPosition;
    this.velocity = initialVelocity;
  }

  reset = (position = new Vector3(), velocity = new Vector3()) => {
    this.initialPosition = position;
    this.position = position;

    this.initialVelocity = velocity;
    this.velocity = velocity;

    this.totalTime = 0;
  }

  update = (time: number) => {
    this.totalTime += time;

    const x = this.initialPosition.x + (this.initialVelocity.x * this.totalTime);

    const y = this.initialPosition.y
      + (this.initialVelocity.y * this.totalTime)
      + (0.5 * accelerationGravity.y
        * (this.totalTime ** 2));

    this.position = new Vector3(x, y);
  }

  toString = () => {
    const strs = [];
    strs.push('ProjectileKinematics2D');
    strs.push(`~ position: ${this.position.toString()}`);
    strs.push(`~ velocity: ${this.velocity.toString()}`);
    return strs.join('\n');
  }
}
