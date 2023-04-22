import { Vector2 } from '../linearAlgebra';

export class LineSegment2D {
  private _startPoint: Vector2;
  private _endPoint: Vector2;

  public constructor(startPoint: Vector2, endPoint: Vector2) {
    this._startPoint = startPoint;
    this._endPoint = endPoint;
  }

  public static fromPoints = (x1: number, y1: number, x2: number, y2: number) => {
    return new LineSegment2D(new Vector2(x1, y1), new Vector2(x2, y2));
  };

  public static zero = () => {
    return new LineSegment2D(new Vector2(), new Vector2());
  };

  public get flatPoints() {
    return [
      this._startPoint.x,
      this._startPoint.y,
      this._endPoint.x,
      this._endPoint.y,
    ];
  }
}
