import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { Vector3 } from '../math';

export class Ground {
  konvaLine?: Konva.Line;

  startX: number;
  endX: number;
  y: number;

  constructor(startX: number, endX: number, y: number) {
    this.startX = startX;
    this.endX = endX;
    this.y = y;
  }

  konvaDraw = (
    layer: Konva.Layer,
    { viewportMatrix = util.defaultViewportMatrix } = {},
  ) => {
    const startPoint = new Vector3(this.startX, this.y, 0);
    const endPoint = new Vector3(this.endX, this.y, 0);

    util.plotKonvaLine(
      layer,
      startPoint,
      endPoint,
      constants.black,
      constants.strokeWidth,
      viewportMatrix,
    );
  }
}
