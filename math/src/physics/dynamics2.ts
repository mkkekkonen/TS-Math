import * as constants from '../constants';
import { Vector3 } from '../math';

export class Dynamics {
  getAcceleration: (velocity: Vector3) => Vector3

  acceleration?: Vector3;

  constructor(getAcceleration: (velocity: Vector3) => Vector3) {
    this.getAcceleration = getAcceleration;
  }

  update = (timeDelta: number, velocity: Vector3, position: Vector3) => {
    this.acceleration = this.getAcceleration(velocity);

    const velocityDelta = this.acceleration.multiplyScalar(timeDelta);
    let newVelocity = velocity.add(velocityDelta);
    if (newVelocity.length < constants.epsilon) {
      newVelocity = new Vector3(0, 0, 0);
    }

    const positionDelta = newVelocity.multiplyScalar(timeDelta);
    const newPosition = position.add(positionDelta);

    return { velocity: newVelocity, position: newPosition };
  }
}
