import { LineSegment2DNew } from '../../math/geometry';

export abstract class AbstractLineSegment2D {
  lineSegment: LineSegment2DNew;

  constructor(lineSegment: LineSegment2DNew) {
    this.lineSegment = lineSegment;
  }

  abstract render(options: any): void;
};
