import Konva from 'konva';

import * as constants from '../constants';
import * as util from '../util';
import { Vector3 } from '../math';

import { AbstractUiObject } from './abstractUiObject';

interface ITextCircleOptions {
  radius?: number
  strokeWidth?: number
  stroke?: string
}

export class TextCircle extends AbstractUiObject {
  konvaCircle?: Konva.Circle;
  konvaText?: Konva.Text;

  x: number;
  y: number;

  text: string;

  radius: number;
  strokeWidth: number;
  stroke: string;

  constructor(x: number, y: number, text: string, options: ITextCircleOptions = {}) {
    super();

    this.x = x; // world coordinate
    this.y = y; // world coordinate

    this.text = text;

    this.radius = options.radius || 12;
    this.strokeWidth = options.strokeWidth || 1;
    this.stroke = options.stroke || constants.darkGrey;
  }

  draw = (layer: Konva.Layer) => {
    const point = new Vector3(this.x, this.y, 0);
    const screenPoint = util.defaultViewportMatrix.multiplyVector(point);

    this.konvaCircle = new Konva.Circle({
      x: screenPoint.x,
      y: screenPoint.y,
      radius: this.radius,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
    });

    this.konvaText = new Konva.Text({
      x: screenPoint.x + this.radius + 10,
      y: screenPoint.y - 8,
      text: this.text,
      fontSize: 16,
      fontFamily: 'sans-serif',
      fill: this.stroke,
    });

    layer.add(this.konvaCircle);
    layer.add(this.konvaText);
  }
}
