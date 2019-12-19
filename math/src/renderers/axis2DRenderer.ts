import Konva from 'konva';

import { worldWidth, worldHeight, black, strokeWidth } from '../constants';
import { Vector3 } from '../math';
import { defaultViewportMatrix } from '../util';

const xAxisStartPoint = new Vector3(-(worldWidth / 2), 0, 0);
const xAxisEndPoint = new Vector3(worldWidth / 2, 0, 0);
const yAxisStartPoint = new Vector3(0, -(worldHeight / 2), 0);
const yAxisEndPoint = new Vector3(0, worldHeight / 2, 0);

const xAxisScreenStartPoint = defaultViewportMatrix.multiplyVector(xAxisStartPoint);
const xAxisScreenEndPoint = defaultViewportMatrix.multiplyVector(xAxisEndPoint);
const yAxisScreenStartPoint = defaultViewportMatrix.multiplyVector(yAxisStartPoint);
const yAxisScreenEndPoint = defaultViewportMatrix.multiplyVector(yAxisEndPoint);

export const addAxesToLayer = (layer: Konva.Layer) => {
  const xAxis = new Konva.Line({
    points: [
      xAxisScreenStartPoint.x, xAxisScreenStartPoint.y,
      xAxisScreenEndPoint.x, xAxisScreenEndPoint.y,
    ],
    stroke: black,
    strokeWidth,
  });

  const yAxis = new Konva.Line({
    points: [
      yAxisScreenStartPoint.x, yAxisScreenStartPoint.y,
      yAxisScreenEndPoint.x, yAxisScreenEndPoint.y,
    ],
    stroke: black,
    strokeWidth,
  });

  layer.add(xAxis);
  layer.add(yAxis);
};
