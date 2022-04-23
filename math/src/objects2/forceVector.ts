import Konva from 'konva';

import * as constants from '../constants';
import * as utils from '../util';
import { Matrix4x4, Vector3 } from '../math';

import { AbstractObject } from './abstractObject';

interface IVectorOptions {
  startPoint?: Vector3 // as the vector is drawn
  initialForce?: Vector3
  stroke?: string
  strokeWidth?: number
}

interface IVectorUpdateOptions {
  newPosition: Vector3
  newForce?: Vector3
}

export class ForceVector extends AbstractObject {
  konvaLine?: Konva.Line;

  force: Vector3;

  stroke: string;
  strokeWidth: number;

  constructor(options: IVectorOptions = {}) {
    super(
      { startPosition: options.startPoint || new Vector3(0, 0, 0) },
    );

    this.force = options.initialForce || new Vector3(0, 0, 0);

    this.stroke = options.stroke || constants.black;
    this.strokeWidth = options.strokeWidth || constants.strokeWidth;
  }

  update(timeDelta: number, options: IVectorUpdateOptions) {
    this.position = options.newPosition;

    if (options.newForce) {
      this.force = options.newForce;
    }
  }

  konvaDraw = (layer: Konva.Layer, viewportMatrix = utils.defaultViewportMatrix) => {
    const endPoint = this.position.add(this.force);

    if (!this.konvaLine) {
      this.konvaLine = utils.plotKonvaLine(
        layer,
        this.position,
        endPoint,
        this.stroke,
        this.strokeWidth,
        viewportMatrix,
      );
    } else {
      const screenStartPoint = viewportMatrix.multiplyVector(this.position);
      const screenEndPoint = viewportMatrix.multiplyVector(endPoint);

      this.konvaLine.points([
        screenStartPoint.x,
        screenStartPoint.y,
        screenEndPoint.x,
        screenEndPoint.y,
      ]);
    }
  }
}
