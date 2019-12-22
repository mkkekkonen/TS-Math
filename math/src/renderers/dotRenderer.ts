import Konva from 'konva';

import * as constants from '../constants';
import * as util from '../util';
import { Vector3 } from '../math';

export const addDotToLayer = (
  point: Vector3,
  layer: Konva.Layer,
  radius = constants.dotRadius,
  fillColor = constants.red,
  viewportMatrix = util.defaultViewportMatrix
) => {
  const screenPoint = viewportMatrix.multiplyVector(point);
  const { x, y } = screenPoint;

  const circle = new Konva.Circle({
    x, y,
    radius,
    fill: fillColor,
  });
  
  layer.add(circle);
};
