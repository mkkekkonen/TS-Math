import Konva from 'konva';

import { LineEquation } from './lineEquation';
import { Vector3 } from '..';
import * as constants from '../../constants';
import * as util from '../../util';

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

  toString = () => {
    if (!this.a && !this.b) {
      return '';
    }
    const a = this.a ? `${this.a}x + ` : '';
    const b = this.b ? `${this.b}y + ` : '';
    const c = this.c ? this.c : '';
    return `${a}${b}${c}`;
  }
}
