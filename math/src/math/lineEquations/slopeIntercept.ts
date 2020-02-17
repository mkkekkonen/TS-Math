import Konva from 'konva';

import { LineEquation, SLOPE_INTERCEPT } from './lineEquation';
import { Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

export class SlopeInterceptEquation extends LineEquation {
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

  lineIntersects = (otherLine: LineEquation) => {
    if (!(otherLine instanceof SlopeInterceptEquation)) {
      return false;
    }

    const otherSlopeIntercept = otherLine as SlopeInterceptEquation;

    if (this.slope === otherSlopeIntercept.slope
        && this.yIntercept === otherSlopeIntercept.yIntercept) {
      return true;
    }

    if (this.slope === otherSlopeIntercept.slope
        && this.yIntercept !== otherSlopeIntercept.yIntercept) {
      return false;
    }

    const xFactor = this.slope - otherSlopeIntercept.slope;
    const constant = otherSlopeIntercept.yIntercept - this.yIntercept;

    const x = constant / xFactor;
    const y = (this.slope * x) + this.yIntercept;

    return new Vector3(x, y);
  }

  angleBetween = (otherLine: LineEquation) => {
    if (!(otherLine instanceof SlopeInterceptEquation)) {
      return 0;
    }

    const otherSlopeIntercept = otherLine as SlopeInterceptEquation;

    const tangent = Math.abs(
      (this.slope - otherSlopeIntercept.slope)
        / (1 - (this.slope * otherSlopeIntercept.slope)),
    );

    return Math.atan(tangent);
  }

  /** TODO: implement */
  distanceTo = (v: Vector3) => 0;

  convertToSlopeIntercept = () => this;

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
