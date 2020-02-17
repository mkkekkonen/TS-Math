import Konva from 'konva';

import { Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

export class Point2D {
  constructor(
    public point = new Vector3(),
    private color = constants.red,
    private radius = constants.dotRadius,
  ) {}

  update = (x: number, y: number) => {
    this.point.x = x;
    this.point.y = y;
  }

  render = (layer: Konva.Layer, viewportMatrix = util.defaultViewportMatrix) => {
    const screenLocation = viewportMatrix.multiplyVector(this.point);
    const { x, y } = screenLocation;
    const circle = new Konva.Circle({
      x,
      y,
      radius: this.radius,
      fill: this.color,
    });
    layer.add(circle);
  }
}
