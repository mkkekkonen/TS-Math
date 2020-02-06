import { Vector3, PolarCoordinates } from '../math';
import * as util from '../util';

const TURN_DELTA = 20; // degrees per second

interface IUpdateOptions {
  yAxis?: number
  turnLeft?: boolean,
  turnRight?: boolean,
}

export class ObjectKinematics2D {
  direction = new PolarCoordinates(1, 0);
  velocity = new Vector3();
  speed = 0;
  accelerationScalar = 0;

  constructor(public position: Vector3) {}

  get rotation() {
    return this.direction.theta;
  }

  update = (time: number, { yAxis, turnLeft, turnRight }: IUpdateOptions) => {
    const direction = Vector3.fromPolarCoordinates(this.direction);

    if (yAxis !== undefined) {
      this.accelerationScalar = yAxis;
    }

    const velocityDelta = direction.multiplyScalar(this.accelerationScalar * time);
    this.velocity = this.velocity.add(velocityDelta);

    const positionDelta = this.velocity.multiplyScalar(time);
    this.position = this.position.add(positionDelta);

    if (turnLeft) {
      this.turnLeft(time);
    } else if (turnRight) {
      this.turnRight(time);
    }
  }

  turnLeft = (time: number) => {
    const direction = this.direction.clone();
    direction.theta += TURN_DELTA * time;
    if (direction.theta >= 360) {
      direction.theta -= 360;
    }
    this.direction = direction;
  }

  turnRight = (time: number) => {
    const direction = this.direction.clone();
    direction.theta -= TURN_DELTA * time;
    if (direction.theta < 0) {
      direction.theta -= 360;
    }
    this.direction = direction;
  }

  toString = () => {
    let str = 'ObjectKinematics2D:\n';
    str += `~ acceleration: ${util.round(this.accelerationScalar)} units/s^2\n`;
    str += `~ speed: ${util.round(this.velocity.length)} units/s^2\n`;
    str += `~ direction polar coords angle: ${util.round(this.direction.theta)}\n`;
    str += `~ position: ${this.position.toString()}`;
    return str;
  }
}
