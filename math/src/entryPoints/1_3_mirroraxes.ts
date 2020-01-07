import * as util from '../util';
import * as constants from '../constants';
import { axis2DRenderer } from '../renderers';
import { LineSegment2D } from '../math/geometry';
import { Vector3 } from '../math';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D();
const mirroredLine = new LineSegment2D(undefined, undefined, { strokeColor: constants.darkGrey });

const getCheckedInputId = () => {
  const radioButtons = Array.from(<HTMLInputElement[]><any>document.getElementsByName('mirroracross'));
  const checkedElement = radioButtons.find(rb => rb.checked);
  return checkedElement ? checkedElement.id : undefined;
};

const drawMirroredLine = (startPoint?: Vector3, endPoint?: Vector3) => {
  const checkedInputId = getCheckedInputId();

  if (!startPoint || !endPoint) {
    return;
  }

  let mirroredStartPoint: Vector3 | undefined = undefined;
  let mirroredEndPoint: Vector3 | undefined = undefined;

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

const drawLines = () => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);
  line.konvaRender(layer);
  drawMirroredLine(line.startPoint, line.endPoint);
  layer.draw();
};

const clickTapHandler = () => {
  util.updateLineSegmentOnClick(line, stage);

  if (line.startPoint && line.endPoint) {
    document.getElementById('output')!.innerHTML = line.toString();
    drawLines();
  }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);

const x = document.getElementById('x');
if (x) x.addEventListener('click', drawLines);

const y = document.getElementById('y');
if (y) y.addEventListener('click', drawLines);

const o = document.getElementById('o');
if (o) o.addEventListener('click', drawLines);
