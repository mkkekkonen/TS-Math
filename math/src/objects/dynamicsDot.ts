import Konva from 'konva';

import { Vector3 } from '../math';
import { ObjectDynamics2D } from '../physics';
import { dotRenderer } from '../renderers';
import * as constants from '../constants';
import * as util from '../util';

interface IDynamicsDotOptions {
  radius?: number
  fillColor?: string
  bounce?: boolean
  worldWidth?: number
  worldHeight?: number
}

export class DynamicsDot {
  radius!: number;
  fillColor!: string;

  dynamics!: ObjectDynamics2D;

  constructor(
    initialPosition = new Vector3(),
    massKg = 1,
    options: IDynamicsDotOptions = {},
  ) {
    this.reset(initialPosition, massKg, options);
  }

  reset = (position?: Vector3, massKg?: number, options: IDynamicsDotOptions = {}) => {
    this.radius = options.radius || constants.dotRadius;
    this.fillColor = options.fillColor || constants.red;

    this.dynamics = new ObjectDynamics2D(
      position,
      massKg,
      {
        radius: this.radius,
        bounce: options.bounce,
        worldWidth: options.worldWidth,
        worldHeight: options.worldHeight,
      },
    );
  }

  update = (time: number, force?: Vector3) => {
    this.dynamics.update(time, force);
  }

  render = (layer: Konva.Layer, viewportMatrix = util.defaultViewportMatrix) => {
    dotRenderer.addDotToLayer(
      this.dynamics.position,
      layer,
      this.radius,
      this.fillColor,
      viewportMatrix,
    );
  }
}
