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

export const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

export const logToDiv = (str: string) => {
  document.getElementById('output')!.innerText = str;
};

export const parseFloatById = (id: string) => {
  const valueString = (document.getElementById(id) as HTMLInputElement)?.value;
  return valueString ? parseFloat(valueString) : 0;
};

export const plotKonvaLine = (
  layer: Konva.Layer,
  startPoint: Vector3,
  endPoint: Vector3,
  strokeColor = constants.black,
  strokeWidth = constants.strokeWidth,
  viewportMatrix = defaultViewportMatrix,
) => {
  const screenStartPoint = viewportMatrix.multiplyVector(startPoint);
  const screenEndPoint = viewportMatrix.multiplyVector(endPoint);

  const konvaLine = new Konva.Line({
    points: [
      screenStartPoint.x,
      screenStartPoint.y,
      screenEndPoint.x,
      screenEndPoint.y,
    ],
    stroke: strokeColor,
    strokeWidth,
  });
  layer.add(konvaLine);
  return konvaLine;
};

export const drawKonvaRectangle = (
  layer: Konva.Layer,
  topLeft: Vector3,
  bottomRight: Vector3,
  fillColor: string,
  strokeColor = constants.black,
  strokeWidth = constants.strokeWidth,
  viewportMatrix = defaultViewportMatrix,
) => {
  const screenTopLeft = viewportMatrix.multiplyVector(topLeft);
  const screenBottomRight = viewportMatrix.multiplyVector(bottomRight);

  const konvaRect = new Konva.Rect({
    x: screenTopLeft.x,
    y: screenTopLeft.y,
    width: screenBottomRight.x - screenTopLeft.x,
    height: screenBottomRight.y - screenTopLeft.y,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth,
  });
  layer.add(konvaRect);
  return konvaRect;
};
