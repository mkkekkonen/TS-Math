import Konva from 'konva';

import { Matrix4x4, Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';
import { SlopeInterceptEquation } from '.';

export const POINT_SLOPE = 'pointSlope' as const;
export const GENERAL_FORM = 'generalForm' as const;
export const SLOPE_INTERCEPT = 'slopeIntercept' as const;

export abstract class LineEquation {
  point?: Vector3;

  konvaLine?: Konva.Line;

  constructor(public strokeColor = constants.black, public strokeWidth = constants.strokeWidth) {}

  abstract update = (params: any) => {}
  abstract renderLine = (
    layer: Konva.Layer,
    worldWidth: number,
    worldHeight: number,
    viewportMatrix: Matrix4x4,
  ) => {}
  abstract getX(): number | undefined;
  abstract calculateY(x: number): number;
  abstract toString(): string;
  abstract lineIntersects(otherLine: LineEquation): Vector3 | boolean;
  abstract angleBetween(otherLine: LineEquation): number;
  abstract convertToSlopeIntercept(): SlopeInterceptEquation;
  abstract distanceTo(v: Vector3): number;

  plotVerticalLine = (
    layer: Konva.Layer,
    worldHeight = constants.worldHeight,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    const x = this.getX();

    const startYCoordinate = -(worldHeight / 2);
    const endYCoordinate = worldHeight / 2;

    const segmentStartPoint = new Vector3(x, startYCoordinate);
    const segmentEndPoint = new Vector3(x, endYCoordinate);

    this.konvaLine = util.plotKonvaLine(
      layer,
      segmentStartPoint,
      segmentEndPoint,
      this.strokeColor,
      this.strokeWidth,
      viewportMatrix,
    );
  }

  plotLine = (
    layer: Konva.Layer,
    worldWidth = constants.worldWidth,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    const startXCoordinate = -(worldWidth / 2);
    const endXCoordinate = worldWidth / 2;

    const startYCoordinate = this.calculateY(startXCoordinate);
    const segmentStartPoint = new Vector3(startXCoordinate, startYCoordinate);

    const endYCoordinate = this.calculateY(endXCoordinate);
    const segmentEndPoint = new Vector3(endXCoordinate, endYCoordinate);

    this.konvaLine = util.plotKonvaLine(
      layer,
      segmentStartPoint,
      segmentEndPoint,
      this.strokeColor,
      this.strokeWidth,
      viewportMatrix,
    );
  }
}
