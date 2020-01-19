import Konva from 'konva';

import { LineEquation } from './lineEquation';
import { Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

export class PointSlopeEquation extends LineEquation {
  constructor(
    public point?: Vector3,
    public slope: number = 0,
    strokeColor = constants.black,
    strokeWidth = constants.strokeWidth,
  ) {
    super(strokeColor, strokeWidth);
  }

  update = ({ point, slope }: { point: Vector3, slope: number }) => {
    this.point = point;
    this.slope = slope;
  }

  getX = () => this.point?.x;

  calculateY = (x: number) => {
    if (this.point && (this.slope || this.slope === 0)) {
      return (this.slope * (x - this.point.x)) + this.point.y;
    }
    return 0;
  }

  renderLine = (
    layer: Konva.Layer,
    worldWidth = constants.worldWidth,
    worldHeight = constants.worldHeight,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    if ((this.slope
        || this.slope === 0
        || (this.slope !== undefined && Number.isNaN(this.slope))) && this.point) {
      if (Number.isNaN(this.slope)) {
        this.plotVerticalLine(layer, worldHeight, viewportMatrix);
      } else {
        this.plotLine(layer, worldWidth, viewportMatrix);
      }
    }
  }

  toString = () => {
    if (this.point && (this.slope)) {
      return `y - ${this.point.y} = ${this.slope}(x - ${this.point.x})`;
    }
    if (this.point && !this.slope) {
      return `y = ${this.point.y}`;
    }
    return '';
  }
}
