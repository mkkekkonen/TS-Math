import Konva from 'konva';

import { Matrix4x4, Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

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
  abstract getX = (): number | undefined => 0;
  abstract calculateY = (x: number): number => 0;
  abstract toString = (): string => '';

  plotVerticalLine = (
    layer: Konva.Layer,
    worldHeight = constants.worldHeight,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    const x = this.getX();

    const startYCoordinate = -(worldHeight / 2);
    const endYCoordinate = worldHeight / 2;

    const segmentStartPoint = viewportMatrix.multiplyVector(
      new Vector3(x, startYCoordinate),
    );
    const segmentEndPoint = viewportMatrix.multiplyVector(
      new Vector3(x, endYCoordinate),
    );

    this.konvaLine = util.plotKonvaLineSegment(
      layer, segmentStartPoint, segmentEndPoint, this.strokeColor, this.strokeWidth,
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
    const segmentStartPoint = viewportMatrix.multiplyVector(
      new Vector3(startXCoordinate, startYCoordinate),
    );

    const endYCoordinate = this.calculateY(endXCoordinate);
    const segmentEndPoint = viewportMatrix.multiplyVector(
      new Vector3(endXCoordinate, endYCoordinate),
    );

    this.konvaLine = util.plotKonvaLineSegment(
      layer, segmentStartPoint, segmentEndPoint, this.strokeColor, this.strokeWidth,
    );
  }
}
