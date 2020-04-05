import Konva from 'konva';

import { LineSegment2D } from '../math/geometry';
import { Vector3 } from '../math';
import { DynamicsDot } from '../objects';
import { inputManager } from '../input';
import * as util from '../util';
import * as constants from '../constants';

const FORCE_MULTIPLIER = 100;

const getForceVector = (forceStartPoint?: Vector3, forceEndPoint?: Vector3) => {
  if (forceStartPoint && forceEndPoint) {
    return forceEndPoint.subtract(forceStartPoint);
  }

  return undefined;
};

const reset = (dot: DynamicsDot) => {
  const massKg = util.parseFloatById('mass') || 10;

  dot.reset(new Vector3(), massKg, { bounce: true });
};

const update = (
  time: number,
  forceLineSegment: LineSegment2D,
  dot: DynamicsDot,
  forceStartPoint?: Vector3,
  forceEndPoint?: Vector3,
) => {
  const forceVector = getForceVector(forceStartPoint, forceEndPoint);
  const force = forceVector && forceVector.multiplyScalar(FORCE_MULTIPLIER);

  if (forceStartPoint && forceEndPoint) {
    forceLineSegment.update(forceStartPoint, forceEndPoint);
  }

  dot.update(time, force);
};

const render = (
  layer: Konva.Layer,
  forceLineSegment: LineSegment2D,
  dot: DynamicsDot,
  forceStartPoint?: Vector3,
  forceEndPoint?: Vector3,
) => {
  layer.removeChildren();

  if (forceStartPoint && forceEndPoint) {
    forceLineSegment.konvaRender(layer);
  }

  dot.render(layer);

  layer.draw();
};

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();

  let forceStartPoint: Vector3 | undefined;
  let forceEndPoint: Vector3 | undefined;
  const dot = new DynamicsDot(new Vector3(), 10, { bounce: true });

  const resetForce = () => {
    if (forceStartPoint && forceEndPoint) {
      forceStartPoint = undefined;
      forceEndPoint = undefined;
    }
  };

  const forceLineSegment = new LineSegment2D();

  stage.on('mousedown', () => {
    forceStartPoint = inputManager.getMouseWorldPosition(stage);
  });

  stage.on('touchstart', () => {
    forceStartPoint = inputManager.getMouseWorldPosition(stage);
  });

  stage.on('mouseup', () => {
    forceEndPoint = inputManager.getMouseWorldPosition(stage);
  });

  stage.on('touchend', () => {
    forceEndPoint = inputManager.getMouseWorldPosition(stage);
  });

  document.getElementById('resetButton')?.addEventListener('click', () => reset(dot));

  const animation = new Konva.Animation((frame) => {
    if (frame) {
      const timeDeltaSeconds = frame.timeDiff / 1000;
      update(timeDeltaSeconds, forceLineSegment, dot, forceStartPoint, forceEndPoint);
      render(layer, forceLineSegment, dot, forceStartPoint, forceEndPoint);
      resetForce();
    }
  });

  animation.start();
};
