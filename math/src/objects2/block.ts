import Konva from 'konva';

import * as constants from '../constants';
import * as utils from '../util';
import { Vector3 } from '../math';

type VectorFn = (self: Block) => Vector3;

interface IRectOptions {
  width?: number
  height?: number
  initialVelocity?: Vector3
  color?: string
  strokeWidth?: number
  handleCollision?: VectorFn
}

export class Block {
  konvaRect?: Konva.Rect;

  width: number;
  height: number;

  position: Vector3;
  velocity: Vector3;
  massKg: number;

  getAcceleration: VectorFn;
  handleCollision?: VectorFn;

  color: string;
  stroke = constants.black;
  strokeWidth: number;

  constructor(
    position: Vector3,
    mass: number,
    getAcceleration: VectorFn,
    options: IRectOptions = {},
  ) {
    this.width = options.width || 1;
    this.height = options.height || 1;

    this.position = position;
    this.velocity = options.initialVelocity || new Vector3(0, 0, 0);
    this.massKg = mass;

    this.getAcceleration = getAcceleration;
    this.handleCollision = options.handleCollision;

    this.color = options.color || 'red';
    this.strokeWidth = options.strokeWidth || constants.strokeWidth;
  }

  update = (timeDelta: number) => {
    const acceleration = this.getAcceleration(this);

    const velocityDelta = acceleration.multiplyScalar(timeDelta);
    this.velocity = this.velocity.add(velocityDelta);

    const positionDelta = this.velocity.multiplyScalar(timeDelta);
    this.position = this.position.add(positionDelta);

    if (this.handleCollision) {
      this.position = this.handleCollision(this);
    }
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
