import Konva from 'konva';

import { Vector3, Matrix4x4 } from '../math';
import { Dynamics } from '../physics';

interface IObjectOptions {
  startPosition?: Vector3
  initialVelocity?: Vector3
  mass?: number
}

export abstract class AbstractObject {
  position: Vector3;
  velocity?: Vector3;
  dynamics?: Dynamics;

  mass?: number;

  constructor(options: IObjectOptions, dynamics?: Dynamics) {
    this.position = options.startPosition || new Vector3(0, 0, 0);
    this.velocity = options.initialVelocity || new Vector3(0, 0, 0);
    this.dynamics = dynamics;

    this.mass = options.mass;
  }

  abstract konvaDraw: (layer: Konva.Layer, viewportMatrix: Matrix4x4) => void;

  public update(
    timeDelta: number,
    options: any = {},
  ) {
    if (this.dynamics && this.velocity) {
      const { velocity, position } = this.dynamics.update(
        timeDelta,
        this.velocity,
        this.position,
      );

      this.velocity = velocity;
      this.position = position;
    }
  }
}
