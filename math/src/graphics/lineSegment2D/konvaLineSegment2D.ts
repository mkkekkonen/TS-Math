import Konva from 'konva';

import * as constants from '../../constants';
import { LineSegment2DNew } from '../../math/geometry';

import { AbstractLineSegment2D } from './abstractLineSegment2D';

interface IOptions {
  layer: Konva.Layer
  stroke?: string
  strokeWidth?: number
}

export class KonvaLineSegment2D extends AbstractLineSegment2D {
  constructor(lineSegment: LineSegment2DNew) {
    super(lineSegment);
  }

  render(options: IOptions) {
    const line = new Konva.Line({
      points: [
        this.lineSegment.startX, this.lineSegment.startY,
        this.lineSegment.endX, this.lineSegment.endY,
      ],
      stroke: options.stroke || constants.black,
      strokeWidth: options.strokeWidth || constants.strokeWidth
    });

    options.layer.add(line);
  }
}
