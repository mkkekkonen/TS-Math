import Konva from 'konva';

import { LineEquation } from './lineEquation';
import { Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

export class PointSlopeEquation implements LineEquation {
  point?: Vector3;
  slope?: number;

  update = ({ point, slope }:  { point: Vector3, slope: number }) => {
    this.point = point;
    this.slope = slope;
  }

  render = (
    layer: Konva.Layer,
    worldWidth = constants.worldWidth,
    worldHeight = constants.worldHeight,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    
  }
}
