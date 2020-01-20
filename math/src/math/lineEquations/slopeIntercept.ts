import Konva from 'konva';

import { LineEquation, SLOPE_INTERCEPT } from './lineEquation';
import { Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

export class SlopeInterceptEquation extends LineEquation {
  type = SLOPE_INTERCEPT;

  constructor(
    public slope = 0,
    public yIntercept = 0,
    strokeColor = constants.black,
    strokeWidth = constants.strokeWidth,
  ) {
    super(strokeColor, strokeWidth);
  }

  update = ({ slope, yIntercept }: { slope: number, yIntercept: number }) => {
    this.slope = slope;
    this.yIntercept = yIntercept;
  }

  getX = () => 0;

  calculateY = (x: number) => (this.slope * x) + this.yIntercept;

  renderLine = (
    layer: Konva.Layer,
    worldWidth = constants.worldWidth,
    worldHeight = constants.worldHeight,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    if (this.slope === 0) {
      this.plotVerticalLine(layer, worldHeight, viewportMatrix);
    } else {
      this.plotLine(layer, worldWidth, viewportMatrix);
    }
  }

  /**
   * returns y = kx + b
   */
  toString = () => {
    const slope = this.slope ? `${this.slope}x + ` : '';
    return `y = ${slope}${this.yIntercept}`;
  }
}
