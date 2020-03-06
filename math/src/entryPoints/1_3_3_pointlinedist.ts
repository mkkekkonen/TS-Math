import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { axis2DRenderer } from '../renderers';
import {
  PointSlopeEquation, GeneralFormEquation, SlopeInterceptEquation, lineUtils,
} from '../math/lineEquations';
import { LineSegment2D, Point2D } from '../math/geometry';
import { Vector3 } from '../math';
import { inputManager } from '../input';

const clickTapHandler = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  fixedLineGeneralForm: GeneralFormEquation,
  fixedLineSlopeIntercept: SlopeInterceptEquation,
  distanceLineEquation: PointSlopeEquation,
  lineSegment: LineSegment2D,
  point: Point2D,
  linePoint: Point2D,
) => {
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

  util.logToDiv(`Distance: ${util.round(fixedLineGeneralForm.distanceTo(point.point))}`);

  layer.draw();
};

export const run = () => {
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

  const handleClick = () => clickTapHandler(
    stage,
    layer,
    fixedLineGeneralForm,
    fixedLineSlopeIntercept,
    distanceLineEquation,
    lineSegment,
    point,
    linePoint,
  );

  stage.on('click', handleClick);
  stage.on('tap', handleClick);
};
