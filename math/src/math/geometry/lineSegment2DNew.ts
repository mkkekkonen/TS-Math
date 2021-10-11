import { Vector3 } from '../vector3';

interface IOptions {
  startX?: number
  startY?: number
  endX?: number
  endY?: number

  startPoint?: Vector3
  endPoint?: Vector3
}

export class LineSegment2DNew {
  startPoint: Vector3;
  endPoint: Vector3;

  constructor(options: IOptions) {
    if (options.startPoint && options.endPoint) {
      this.startPoint = options.startPoint;
      this.endPoint = options.endPoint;
    } else if (
      !(Number.isNaN(options.startX)
        || Number.isNaN(options.startY)
        || Number.isNaN(options.endX)
        || Number.isNaN(options.endY))
    ) {
      this.startPoint = new Vector3(options.startX, options.startY);
      this.endPoint = new Vector3(options.endX, options.endY);
    } else {
      throw new Error('Invalid options');
    }
  }

  get startX() {
    return this.startPoint.x;
  }

  get startY() {
    return this.startPoint.y;
  }

  get endX() {
    return this.endPoint.x;
  }

  get endY() {
    return this.startPoint.y;
  }
}
