import { Vector3 } from '../math';
import * as constants from '../constants';

interface IDynamicsOptions {
  radius?: number
  bounce?: boolean
}

export class ObjectDynamics2D {
  velocity: Vector3;

  radius: number;

  bounce: boolean;

  constructor(
    public position = new Vector3(),
    public massKg = 1,
    options: IDynamicsOptions = {},
  ) {
    this.velocity = new Vector3();

    this.radius = options.radius || constants.dotRadius;
    this.bounce = !!options.bounce;
  }

  update = (
    time: number,
    force?: Vector3,
    {
      worldWidth = constants.worldWidth,
      worldHeight = constants.worldHeight,
    }: { worldWidth?: number, worldHeight?: number } = {},
  ) => {
    const acceleration = force ? force.divideScalar(this.massKg) : new Vector3();

    const velocityDelta = acceleration.multiplyScalar(time);
    this.velocity = this.velocity.add(velocityDelta);

    const positionDelta = this.velocity.multiplyScalar(time);
    this.position = this.position.add(positionDelta);
  }

  bounce = (worldWidth: number, worldHeight: number) => {
    let crossedSide;
    let loopGuard = 0;
  }

  getCrossedSideKey = () => {
    const crossedSideKey = Object.keys(constants.Sides)
      .find(key => true);
  }

  hasCrossedBorder = (side: constants.Sides, worldWidth: number, worldHeight: number) => {
    switch (side) {
      case constants.Sides.TOP:
        if (this.position.y + this.radius > worldHeight / 2) {
          return true;
        }
        return false;
      case constants.Sides.RIGHT:
        if (this.position.x + this.radius > worldWidth / 2) {
          return true;
        }
        return false;
      case constants.Sides.BOTTOM:
        if (this.position.y - this.radius < -worldHeight / 2) {
          return true;
        }
        return false;
      case constants.Sides.LEFT:
        if (this.position.x - this.radius < -worldWidth / 2) {
          return true;
        }
        return false;
      default:
        return false;
    }
  }
}
