import Konva from 'konva';

import { Vector3 } from '../math';
import { TimeKinematics2D } from '../physics';
import { dotRenderer } from '../renderers';
import * as constants from '../constants';
import * as util from '../util';

interface ITimeDotOptions {
  radius?: number
  fillColor?: string
}

export class TimeDot {
  kinematics: TimeKinematics2D;

  radius: number;
  fillColor: string;

  constructor(
    initialPosition = new Vector3(),
    initialVelocity = new Vector3(),
    acceleration = new Vector3(),
    options: ITimeDotOptions = {},
  ) {
    this.kinematics = new TimeKinematics2D(initialPosition, initialVelocity, acceleration);
    this.radius = options.radius || constants.dotRadius;
    this.fillColor = options.fillColor || constants.red;
  }

  reset = (
    initialPosition = new Vector3(),
    initialVelocity = new Vector3(),
    acceleration = new Vector3(),
  ) => {
    this.kinematics.reset(initialPosition, initialVelocity, acceleration);
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
