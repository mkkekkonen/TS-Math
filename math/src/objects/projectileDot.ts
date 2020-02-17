import Konva from 'konva';

import { Vector3 } from '../math';
import { ProjectileKinematics2D } from '../physics';
import { dotRenderer } from '../renderers';
import * as constants from '../constants';
import * as util from '../util';
import { inputManager } from '../input';

interface IProjectileDotOptions {
  radius?: number
  fillColor?: string
}

export class ProjectileDot {
  radius: number;
  fillColor: string;
  kinematics: ProjectileKinematics2D;

  constructor(
    initialPosition = new Vector3(),
    initialVelocity = new Vector3(),
    options: IProjectileDotOptions = {},
  ) {
    this.kinematics = new ProjectileKinematics2D(initialPosition, initialVelocity);

    this.radius = options.radius || constants.dotRadius;
    this.fillColor = options.fillColor || constants.red;
  }

  reset = (position = new Vector3(), velocity = new Vector3()) => {
    this.kinematics.reset(position, velocity);
  }

  update = (time: number) => {
    this.kinematics.update(time);
  }

  render = (layer: Konva.Layer, viewportMatrix = util.defaultViewportMatrix) => {
    dotRenderer.addDotToLayer(
      this.kinematics.position,
      layer,
      this.radius,
      this.fillColor,
      viewportMatrix,
    );
  }
}
