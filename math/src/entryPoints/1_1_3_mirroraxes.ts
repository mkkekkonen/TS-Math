import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { axis2DRenderer } from '../renderers';
import { LineSegment2D } from '../math/geometry';
import { Vector3 } from '../math';

const getCheckedInputId = () => {
  const radioButtons = Array.from(<HTMLInputElement[]><any>document.getElementsByName('mirroracross'));
  const checkedElement = radioButtons.find((rb) => rb.checked);
  return checkedElement ? checkedElement.id : undefined;
};

const drawMirroredLine = (
  layer: Konva.Layer,
  mirroredLine: LineSegment2D,
  startPoint?: Vector3,
  endPoint?: Vector3,
) => {
  const checkedInputId = getCheckedInputId();

  if (!startPoint || !endPoint) {
    return;
  }

  let mirroredStartPoint: Vector3 | undefined;
  let mirroredEndPoint: Vector3 | undefined;

  if (checkedInputId === 'x') {
    const multiplyWith = new Vector3(1, -1);
    mirroredStartPoint = startPoint.multiply(multiplyWith);
    mirroredEndPoint = endPoint.multiply(multiplyWith);
  } else if (checkedInputId === 'y') {
    const multiplyWith = new Vector3(-1, 1);
    mirroredStartPoint = startPoint.multiply(multiplyWith);
    mirroredEndPoint = endPoint.multiply(multiplyWith);
  } else if (checkedInputId === 'o') {
    const multiplyWith = new Vector3(-1, -1);
    mirroredStartPoint = startPoint.multiply(multiplyWith);
    mirroredEndPoint = endPoint.multiply(multiplyWith);
  }

  if (mirroredStartPoint && mirroredEndPoint) {
    mirroredLine.update(mirroredStartPoint, mirroredEndPoint);
    mirroredLine.konvaRender(layer);
  }
};

const drawLines = (layer: Konva.Layer, line: LineSegment2D, mirroredLine: LineSegment2D) => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);
  line.konvaRender(layer);
  drawMirroredLine(layer, mirroredLine, line.startPoint, line.endPoint);
  layer.draw();
};

const clickTapHandler = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  line: LineSegment2D,
  mirroredLine: LineSegment2D,
) => {
  util.updateLineSegmentOnClick(line, stage);

  if (line.startPoint && line.endPoint) {
    util.logToDiv(line.toString());
    drawLines(layer, line, mirroredLine);
  }
};

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);
  layer.draw();

  const line = new LineSegment2D();
  const mirroredLine = new LineSegment2D(undefined, undefined, { strokeColor: constants.darkGrey });

  stage.on('click', () => clickTapHandler(stage, layer, line, mirroredLine));
  stage.on('tap', () => clickTapHandler(stage, layer, line, mirroredLine));

  const x = document.getElementById('x');
  if (x) x.addEventListener('click', () => drawLines(layer, line, mirroredLine));

  const y = document.getElementById('y');
  if (y) y.addEventListener('click', () => drawLines(layer, line, mirroredLine));

  const o = document.getElementById('o');
  if (o) o.addEventListener('click', () => drawLines(layer, line, mirroredLine));
};
