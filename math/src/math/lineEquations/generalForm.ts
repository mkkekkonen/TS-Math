import Konva from 'konva';

import { LineEquation, GENERAL_FORM } from './lineEquation';
import * as constants from '../../constants';
import * as util from '../../util';
import { Vector3 } from '..';
import { SlopeInterceptEquation } from '.';

export class GeneralFormEquation extends LineEquation {
  constructor(
    public a = 0,
    public b = 0,
    public c = 0,
    strokeColor = constants.black,
    strokeWidth = constants.strokeWidth,
  ) {
    super(strokeColor, strokeWidth);
  }

  update = ({ a, b, c }: { a: number, b: number, c: number }) => {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getX = () => this.a;

  calculateY = (x: number) => ((-this.a * x) - this.c) / this.b;

  /** TODO: implement */
  lineIntersects = (otherLine: LineEquation) => new Vector3();

  /** TODO: implement */
  angleBetween = (otherLine: LineEquation) => 0;

  distanceTo = (v: Vector3) => Math.abs(((this.a * v.x) + (this.b * v.y) + this.c))
    / Math.sqrt((this.a * this.a) + (this.b * this.b));

  convertToSlopeIntercept = () => new SlopeInterceptEquation(
    -(this.a / this.b),
    -(this.c / this.b),
  );

  renderLine = (
    layer: Konva.Layer,
    worldWidth = constants.worldWidth,
    worldHeight = constants.worldHeight,
    viewportMatrix = util.defaultViewportMatrix,
  ) => {
    if (!this.a && !this.b) {
      // do nothing
    } else {
      this.plotLine(layer, worldWidth, viewportMatrix);
    }
  }

  /**
   * returns 0 = ax + by + c
   */
  toString = () => {
    if (!this.a && !this.b) {
      return '';
    }
    const a = this.a ? `${this.a}x + ` : '';
    const b = this.b ? `${this.b}y + ` : '';
    const c = this.c ? this.c : '';
    return `0 = ${a}${b}${c}`;
  }
}
