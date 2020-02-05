import Konva from 'konva';

import { Vector3 } from '../math';
import { ObjectKinematics2D } from '../physics';
import * as constants from '../constants';
import * as util from '../util';

const MULTIPLIER = 48;

const polygonVectors = [
  new Vector3(-0.25, 0.15),
  new Vector3(0.25, 0),
  new Vector3(-0.25, -0.15),
];

interface IShipOptions {
  hasKinematics: boolean
}

export class Ship {
  polygon: Konva.Line;

  kinematics?: ObjectKinematics2D;

  constructor(public location = new Vector3(), options: IShipOptions = { hasKinematics: false }) {
    const linePoints: number[] = [];
    polygonVectors.forEach((vector) => {
      linePoints.push(vector.x * MULTIPLIER);
      linePoints.push(vector.y * MULTIPLIER);
    });
    const transformedLocation = util.defaultViewportMatrix.multiplyVector(this.location);
    this.polygon = new Konva.Line({
      points: linePoints,
      stroke: constants.black,
      strokeWidth: constants.strokeWidth,
      closed: true,
      rotation: 270,
      x: transformedLocation.x,
      y: transformedLocation.y,
    });

    if (options.hasKinematics) {
      this.kinematics = new ObjectKinematics2D(transformedLocation);
    }
  }
}
