import Konva from 'konva';

import * as constants from '../constants';
import * as util from '../util';

import { AbstractFunction } from '../math/functions';
import { Vector3 } from '../math/vector3';
import { TextCircle } from '../ui';

const startVector = new Vector3(-(constants.worldWidth / 2), 0, 0);
const endVector = new Vector3(constants.worldWidth / 2, 0, 0);
const screenStartVector = util.defaultViewportMatrix.multiplyVector(startVector);
const screenEndVector = util.defaultViewportMatrix.multiplyVector(endVector);

const startX = startVector.x;
const endX = endVector.x;

export const plotFunction = (
  fn: AbstractFunction,
  layer: Konva.Layer,
  stroke = constants.black,
  strokeWidth = constants.strokeWidth,
) => {
  const lines: Konva.Line[] = [];

  const startX = -(constants.worldWidth / 2);
  const endX = constants.worldWidth / 2;

  let prevPoint = null;

  for (let x = startX; x <= endX; x += 0.1) {
    const y = fn.getValue(x);
    const curPoint = new Vector3(x, y, 0);
    if (curPoint && prevPoint) {
      const curScreenPoint = util.defaultViewportMatrix.multiplyVector(curPoint);
      const prevScreenPoint = util.defaultViewportMatrix.multiplyVector(prevPoint);
      const line = new Konva.Line({
        points: [
          prevScreenPoint.x, prevScreenPoint.y,
          curScreenPoint.x, curScreenPoint.y,
        ],
        stroke,
        strokeWidth,
      });

      layer.add(line);
      lines.push(line);
    }
    prevPoint = curPoint;
  }

  return lines;
};

export const plotLimits = (
  fn: AbstractFunction,
  layer: Konva.Layer,
) => {
  const circles: TextCircle[] = [];

  for (let x = -5; x < 5; x += 1) {
    const limit = fn.getLimitAt(x);

    const circle = new TextCircle(x, limit, limit.toString());
    circles.push(circle);
    circle.draw(layer);
  }

  return circles;
};
