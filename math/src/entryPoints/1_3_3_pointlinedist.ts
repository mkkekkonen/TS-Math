import * as util from '../util';
import * as constants from '../constants';
import { axis2DRenderer } from '../renderers';
import {
  PointSlopeEquation, GeneralFormEquation, lineUtils,
} from '../math/lineEquations';
import { LineSegment2D, Point2D } from '../math/geometry';
import { Vector3 } from '../math';
import { inputManager } from '../input';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);

const fixedLineGeneralForm = new GeneralFormEquation(1, 2, 3);
const fixedLineSlopeIntercept = fixedLineGeneralForm.convertToSlopeIntercept();

const distanceLineSlope = lineUtils.calculatePerpendicularSlope(fixedLineSlopeIntercept.slope);
const distanceLineEquation = new PointSlopeEquation(new Vector3(), distanceLineSlope);

const point = new Point2D();
const linePoint = new Point2D();
const lineSegment = new LineSegment2D();

fixedLineGeneralForm.renderLine(layer);
layer.draw();

const clickTapHandler = () => {
  layer.removeChildren();

  axis2DRenderer.addAxesToLayer(layer);
  fixedLineGeneralForm.renderLine(layer);

  const mouseWorldPosition = inputManager.getMouseWorldPosition(stage);
  point.update(mouseWorldPosition.x, mouseWorldPosition.y);

  distanceLineEquation.point = point.point;
  const distanceLineSlopeIntercept = distanceLineEquation.convertToSlopeIntercept();
  const commonPoint = distanceLineSlopeIntercept.lineIntersects(fixedLineSlopeIntercept) as Vector3;

  linePoint.update(commonPoint.x, commonPoint.y);
  lineSegment.update(point.point, commonPoint);

  lineSegment.konvaRender(layer);
  point.render(layer);
  linePoint.render(layer);

  util.logToDiv(`Distance: ${util.round(point.point.distanceFromLine(fixedLineGeneralForm))}`);

  layer.draw();
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
