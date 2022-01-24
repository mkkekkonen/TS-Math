import { Vector3 } from '../math';

export class Dynamics {
  getAcceleration: () => Vector3

  constructor(getAcceleration: () => Vector3) {
    this.getAcceleration = getAcceleration;
  }

  update = (timeDelta: number, velocity: Vector3, position: Vector3) => {
    const acceleration = this.getAcceleration();

    const velocityDelta = acceleration.multiplyScalar(timeDelta);
    const newVelocity = velocity.add(velocityDelta);

    const positionDelta = newVelocity.multiplyScalar(timeDelta);
    const newPosition = position.add(positionDelta);

    return { velocity: newVelocity, position: newPosition };
  }
}
