import Konva from 'konva';

import * as constants from '../constants';
import * as utils from '../util';
import { Vector3 } from '../math';
import { Dynamics } from '../physics';

import { AbstractObject } from './abstractObject';

interface IRectOptions {
  width?: number
  height?: number
  initialVelocity?: Vector3
  color?: string
  strokeWidth?: number
  handleCollision?: Function
}

export class Block extends AbstractObject {
  konvaRect?: Konva.Rect;

  width: number;
  height: number;

  velocity: Vector3;
  massKg: number;

  dynamics?: Dynamics;

  color: string;
  stroke = constants.black;
  strokeWidth: number;

  constructor(
    position: Vector3,
    mass: number,
    dynamics?: Dynamics,
    options: IRectOptions = {},
  ) {
    super(
      {
        startPosition: position,
        mass,
      },
    );

    this.width = options.width || 1;
    this.height = options.height || 1;

    this.velocity = options.initialVelocity || new Vector3(0, 0, 0);
    this.massKg = mass;

    this.dynamics = dynamics;

    this.color = options.color || 'red';
    this.strokeWidth = options.strokeWidth || constants.strokeWidth;
  }

  konvaDraw = (layer: Konva.Layer, viewportMatrix = utils.defaultViewportMatrix) => {
    const widthHalved = this.width / 2;
    const heightHalved = this.height / 2;

    const topLeft = new Vector3(
      this.position.x - widthHalved,
      this.position.y + heightHalved,
      0,
    );

    const bottomRight = new Vector3(
      this.position.x + widthHalved,
      this.position.y - heightHalved,
      0,
    );

    if (!this.konvaRect) {
      this.konvaRect = utils.drawKonvaRectangle(
        layer,
        topLeft,
        bottomRight,
        this.color,
        this.stroke,
        this.strokeWidth,
      );
    } else {
      const screenTopLeft = viewportMatrix.multiplyVector(topLeft);

      this.konvaRect.x(screenTopLeft.x);
      this.konvaRect.y(screenTopLeft.y);
    }
  }
}
