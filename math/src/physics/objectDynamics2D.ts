import { Vector3 } from '../math';
import * as constants from '../constants';

interface IDynamicsOptions {
  radius?: number
  bounce?: boolean
  worldWidth?: number
  worldHeight?: number
}

export class ObjectDynamics2D {
  velocity: Vector3;

  radius: number;

  bounceFlag: boolean;

  worldWidth: number;
  worldHeight: number;

  constructor(
    public position = new Vector3(),
    public massKg = 1,
    options: IDynamicsOptions = {},
  ) {
    this.velocity = new Vector3();

    this.radius = 0;
    this.bounceFlag = !!options.bounce;

    this.worldWidth = options.worldWidth || constants.worldWidth;
    this.worldHeight = options.worldHeight || constants.worldHeight;
  }

  update = (
    time: number,
    force?: Vector3,
  ) => {
    const acceleration = force ? force.divideScalar(this.massKg) : new Vector3();

    const velocityDelta = acceleration.multiplyScalar(time);
    this.velocity = this.velocity.add(velocityDelta);

    const positionDelta = this.velocity.multiplyScalar(time);
    this.position = this.position.add(positionDelta);

    if (this.bounceFlag) {
      this.bounce();
    }
  }

  bounce = () => {
    let crossedSide: constants.Sides | undefined;
    let loopGuard = 0;

    while ((crossedSide = this.hasCrossedBorder()) && loopGuard < 2) {
      loopGuard += 1;

      switch (crossedSide) {
        case constants.Sides.TOP: {
          this.velocity.y = -this.velocity.y;
          this.position = this.getBouncedPosition(constants.Sides.TOP);
          break;
        }
        case constants.Sides.RIGHT: {
          this.velocity.x = -this.velocity.x;
          this.position = this.getBouncedPosition(constants.Sides.RIGHT);
          break;
        }
        case constants.Sides.BOTTOM: {
          this.velocity.y = -this.velocity.y;
          this.position = this.getBouncedPosition(constants.Sides.BOTTOM);
          break;
        }
        case constants.Sides.LEFT: {
          this.velocity.x = -this.velocity.x;
          this.position = this.getBouncedPosition(constants.Sides.LEFT);
          break;
        }
        default:
          break;
      }
    }
  }

  hasCrossedBorder = () => {
    if (this.position.y + this.radius > this.worldHeight / 2) {
      return constants.Sides.TOP;
    }
    if (this.position.x + this.radius > this.worldWidth / 2) {
      return constants.Sides.RIGHT;
    }
    if (this.position.y - this.radius < -this.worldHeight / 2) {
      return constants.Sides.BOTTOM;
    }
    if (this.position.x - this.radius < -this.worldWidth / 2) {
      return constants.Sides.LEFT;
    }

    return undefined;
  }

  getBouncedPosition = (side: constants.Sides) => {
    const clonedPosition = this.position.clone();

    switch (side) {
      case constants.Sides.TOP: {
        if (this.position.y < this.worldHeight / 2) {
          return clonedPosition;
        }
        const distanceCrossed = this.position.y - (this.worldHeight / 2);
        clonedPosition.y -= distanceCrossed * 2;
        return clonedPosition;
      }
      case constants.Sides.RIGHT: {
        if (this.position.x < this.worldWidth / 2) {
          return clonedPosition;
        }
        const distanceCrossed = this.position.x - (this.worldWidth / 2);
        clonedPosition.x -= distanceCrossed * 2;
        return clonedPosition;
      }
      case constants.Sides.BOTTOM: {
        if (this.position.y > -this.worldHeight / 2) {
          return clonedPosition;
        }
        const distanceCrossed = -(this.worldHeight / 2) - this.position.y;
        clonedPosition.y += distanceCrossed * 2;
        return clonedPosition;
      }
      case constants.Sides.LEFT: {
        if (this.position.x > -this.worldWidth / 2) {
          return clonedPosition;
        }
        const distanceCrossed = -(this.worldWidth / 2) - this.position.x;
        clonedPosition.x += distanceCrossed * 2;
        return clonedPosition;
      }
      default:
        return clonedPosition;
    }
  }
}
