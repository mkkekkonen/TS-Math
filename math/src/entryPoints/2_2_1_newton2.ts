import Konva from 'konva';

import { LineSegment2D } from '../math/geometry';
import { Vector3 } from '../math';
import * as util from '../util';
import * as constants from '../constants';

const FORCE_MULTIPLIER = 100;

const { stage, layer } = util.getDefaultKonvaStage2();

let forceStartPoint: Vector3;
let forceEndPoint: Vector3;

const forceLineSegment = new LineSegment2D();

const getForceVector = () => {
  if (forceStartPoint && forceEndPoint) {
    return forceEndPoint.subtract(forceStartPoint);
  }

  return null;
};

const update = (time: number) => {
  const forceVector = getForceVector();
  const force = forceVector && forceVector.multiplyScalar(FORCE_MULTIPLIER);

  if (forceStartPoint && forceEndPoint) {
    forceLineSegment.update(forceStartPoint, forceEndPoint);
  }
};
