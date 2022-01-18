import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { Vector3 } from '../math';

export class Ground {
  konvaRect?: Konva.Rect;

  worldWidth: number;
  worldHeight: number;
  y: number;

  constructor(worldWidth: number, worldHeight: number, y: number) {
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.y = y;
  }

  konvaDraw = (
    layer: Konva.Layer,
    { viewportMatrix = util.defaultViewportMatrix } = {},
  ) => {
    const widthHalved = this.worldWidth / 2;
    const heightHalved = this.worldHeight / 2;

    const topLeft = new Vector3(-widthHalved, this.y, 0);
    const topRight = new Vector3(widthHalved, this.y, 0);
    const bottomRight = new Vector3(widthHalved, -heightHalved, 0);
    const bottomLeft = new Vector3(-widthHalved, -heightHalved, 0);

    const screenTopLeft = viewportMatrix.multiplyVector(topLeft);
    const screenTopRight = viewportMatrix.multiplyVector(topRight);
    const screenBottomRight = viewportMatrix.multiplyVector(bottomRight);
    const screenBottomLeft = viewportMatrix.multiplyVector(bottomLeft);

    this.konvaRect = new Konva.Rect({
      x: screenTopLeft.x,
      y: screenTopLeft.y,
      width: screenTopRight.x - screenTopLeft.x,
      height: screenBottomLeft.y - screenTopLeft.y,
      fill: 'green',
      stroke: constants.black,
      strokeWidth: constants.strokeWidth,
    });
    layer.add(this.konvaRect);
  }
}
