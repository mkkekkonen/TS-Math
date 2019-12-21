import { Vector3 } from '..';
import { black, strokeWidth as defaultStrokeWidth } from '../../constants';
import { round, radiansToDegrees } from '../../util';

export class LineSegment2D {
  constructor(public startPoint?: Vector3, public endPoint?: Vector3, public strokeColor = black, public strokeWidth = defaultStrokeWidth) {}

  get length() {
    if (this.startPoint && this.endPoint) {
      return this.startPoint.distanceFrom(this.endPoint);
    }
    return 0;
  }

  get midpoint() {
    if (this.startPoint && this.endPoint) {
      const x = (this.startPoint.x + this.endPoint.x) / 2;
      const y = (this.startPoint.y + this.endPoint.y) / 2;
      return new Vector3(x, y, 0);
    }
    return new Vector3();
  }

  get slope() {
    if (this.startPoint && this.endPoint) {
      const deltaY = this.endPoint.y - this.startPoint.y;
      const deltaX = this.endPoint.x - this.startPoint.x;

      if (deltaX === 0) {
        return NaN;
      }

      return deltaY / deltaX;
    }

    return 0;
  }

  get directionalAngle() {
    if (Number.isNaN(this.slope)) {
      return 90;
    }

    const angleInRadians = Math.atan(this.slope);
    return radiansToDegrees(angleInRadians);
  }

  update = (startPoint?: Vector3, endPoint?: Vector3) => {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  toString = ({ midpoint, slope, directionalAngle }: { midpoint?: boolean, slope?: boolean, directionalAngle?: boolean } = {}) => {
    const stringParts = []

    stringParts.push('Line');
    stringParts.push(`- startPoint: ${this.startPoint ? this.startPoint.toString() : 'undefined'}`);
    stringParts.push(`- endPoint: ${this.endPoint ? this.endPoint.toString() : 'undefined'}`);
    stringParts.push(`- length: ${round(this.length)}`);

    if (midpoint) {
      stringParts.push(`- midpoint: ${this.midpoint.toString()}`);
    }

    if (slope) {
      stringParts.push(`- slope: ${round(this.slope)}`);
    }

    if (directionalAngle) {
      stringParts.push(`- directional angle: ${round(this.directionalAngle)}`);
    }

    return stringParts.join('\n');
  }
}

