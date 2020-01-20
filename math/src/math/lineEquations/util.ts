import { LineEquation, SLOPE_INTERCEPT } from './lineEquation';
import { SlopeInterceptEquation } from './slopeIntercept';
import { Vector3 } from '..';

export const solveSystem = (line1: LineEquation, line2: LineEquation) => {
  if (line1.type !== line2.type) {
    return null;
  }

  if (line1.type === SLOPE_INTERCEPT && line2.type === SLOPE_INTERCEPT) {
    const slopeIntercept1 = line1 as SlopeInterceptEquation;
    const slopeIntercept2 = line2 as SlopeInterceptEquation;

    if (slopeIntercept1 && slopeIntercept2
        && typeof slopeIntercept1.slope === 'number' && typeof slopeIntercept1.yIntercept === 'number'
        && typeof slopeIntercept2.slope === 'number' && typeof slopeIntercept2.yIntercept === 'number') {
      if (slopeIntercept1.slope === slopeIntercept2.slope
          && slopeIntercept1.yIntercept === slopeIntercept2.yIntercept) {
        return true;
      }

      if (slopeIntercept1.slope === slopeIntercept2.slope
          && slopeIntercept1.yIntercept !== slopeIntercept2.yIntercept) {
        return null;
      }

      const xFactor = slopeIntercept1.slope - slopeIntercept2.slope;
      const constant = slopeIntercept2.yIntercept - slopeIntercept1.yIntercept;

      const x = constant / xFactor;
      const y = (slopeIntercept1.slope * x) + slopeIntercept1.yIntercept;

      return new Vector3(x, y);
    }
  }

  return null;
};
