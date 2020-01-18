import Konva from 'konva';

import * as constants from '../constants';
import { Vector3 } from '../math';
import { createViewportMatrix, createReverseViewportMatrix } from '../math/viewport';
import { LineSegment2D } from '../math/geometry';
import { inputManager } from '../input';

export const getDefaultKonvaStage = () => new Konva.Stage({
  container: document.getElementById('canvasContainer') as HTMLDivElement,
  width: constants.canvasWidthPx,
  height: constants.canvasHeightPx,
});

export const getDefaultKonvaStage2 = () => {
  const stage = getDefaultKonvaStage();
  const layer = new Konva.Layer();
  stage.add(layer);
  return { stage, layer };
};

export const defaultViewportMatrix = createViewportMatrix();
export const defaultReverseViewportMatrix = createReverseViewportMatrix();

export const updateLineSegmentOnClick = (lineSegment: LineSegment2D, stage: Konva.Stage) => {
  const worldMousePosition = inputManager.getMouseWorldPosition(stage);
  lineSegment.update(lineSegment.endPoint, worldMousePosition);
};

export const round = (n: number) => Math.round(n * 100) / 100;

export const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

export const logToDiv = (str: string) => {
  document.getElementById('output')!.innerText = str;
};

export const plotKonvaLineSegment = (
  layer: Konva.Layer,
  segmentStartPoint: Vector3,
  segmentEndPoint: Vector3,
  strokeColor = constants.black,
  strokeWidth = constants.strokeWidth,
) => {
  const konvaLine = new Konva.Line({
    points: [
      segmentStartPoint.x,
      segmentStartPoint.y,
      segmentEndPoint.x,
      segmentEndPoint.y,
    ],
    stroke: strokeColor,
    strokeWidth,
  });
  layer.add(konvaLine);
  return konvaLine;
};
