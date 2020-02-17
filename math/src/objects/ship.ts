import Konva from 'konva';

import { Vector3 } from '../math';
import { ObjectKinematics2D } from '../physics';
import { ObjectSteering2D } from '../input';
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
  hasSteering: boolean
}

export class Ship {
  polygon: Konva.Line;

  kinematics?: ObjectKinematics2D;
  steering?: ObjectSteering2D;

  constructor(
    location = new Vector3(),
    options: IShipOptions = { hasKinematics: false, hasSteering: false },
  ) {
    const linePoints: number[] = [];
    polygonVectors.forEach((vector) => {
      linePoints.push(vector.x * MULTIPLIER);
      linePoints.push(vector.y * MULTIPLIER);
    });
    const transformedLocation = util.defaultViewportMatrix.multiplyVector(location);
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
      this.kinematics = new ObjectKinematics2D(location);
    }

    if (options.hasSteering) {
      this.steering = new ObjectSteering2D();
      this.steering.initialize();
    }
  }

  update = (time: number) => {
    if (this.kinematics) {
      const turnLeft = this.steering && this.steering.xAxis < 0;
      const turnRight = this.steering && this.steering.xAxis > 0;

      this.kinematics.update(time, { yAxis: this.steering?.yAxis, turnLeft, turnRight });
    }
  }

  updatePolygon = () => {
    if (this.kinematics) {
      const transformedLocation = util.defaultViewportMatrix
        .multiplyVector(this.kinematics.position);

      this.polygon.x(transformedLocation.x);
      this.polygon.y(transformedLocation.y);

      this.polygon.rotation(-this.kinematics.rotation);
    }
  }
}
