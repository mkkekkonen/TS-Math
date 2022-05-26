import Konva from 'konva';

import * as utils from '../util';
import * as constants from '../constants';
import { Vector3 } from '../math';

interface IPlaneOptions {
}

export class InclinedPlane {
  konvaPolygon?: Konva.Line;

  width: number;
  angle: number;
  bottomY: number;

  constructor(width: number, angle: number, bottomY: number, options: IPlaneOptions = {}) {
    this.width = width;
    this.angle = angle;
    this.bottomY = bottomY;
  }

  get height(): number {
    // the inclined plane is a right triangle,
    // the 90 deg angle is at the bottom right,
    // the bottom left angle is defined by this.angle
    // - calculate the remaining angle at the top right
    const topAngle = 90 - this.angle;

    const alpha = utils.degreesToRadians(this.angle);
    const beta = utils.degreesToRadians(topAngle);

    // use law of sines to calculate height
    const height = (Math.sin(alpha) * this.width) / Math.sin(beta);

    return height;
  }

  konvaDraw = (
    layer: Konva.Layer,
    { viewportMatrix = utils.defaultViewportMatrix } = {},
  ) => {
    const topRight = new Vector3(
      this.width / 2,
      this.bottomY + this.height,
      0,
    );

    const bottomRight = new Vector3(
      this.width / 2,
      this.bottomY,
      0,
    );

    const bottomLeft = new Vector3(
      -this.width / 2,
      this.bottomY,
      0,
    );

    const screenTopRight = viewportMatrix.multiplyVector(topRight);
    const screenBottomRight = viewportMatrix.multiplyVector(bottomRight);
    const screenBottomLeft = viewportMatrix.multiplyVector(bottomLeft);

    this.konvaPolygon = new Konva.Line({
      points: [
        screenTopRight.x,
        screenTopRight.y,
        screenBottomRight.x,
        screenBottomRight.y,
        screenBottomLeft.x,
        screenBottomLeft.y,
      ],
      fill: constants.blue,
      stroke: constants.black,
      strokeWidth: constants.strokeWidth,
      closed: true,
    });

    layer.add(this.konvaPolygon);
  }
}
