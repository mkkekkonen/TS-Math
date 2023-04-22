export class Vector2 {
  private _x: number;
  private _y: number;

  public constructor(x?: number, y?: number) {
    this._x = x || 0;
    this._y = y || 0;
  }

  public get x() {
    return this._x;
  }

  public set x(x: number) {
    this._x = x;
  }

  public get y() {
    return this._y;
  }

  public set y(y: number) {
    this._y = y;
  }
}
