import Konva from 'konva';

import { LineSegment2D } from '../math/geometry';
import { Vector3 } from '../math';
import { DynamicsDot } from '../objects';
import { inputManager } from '../input';
import * as util from '../util';
import * as constants from '../constants';

const FORCE_MULTIPLIER = 100;

const { stage, layer } = util.getDefaultKonvaStage2();

let forceStartPoint: Vector3 | undefined;
let forceEndPoint: Vector3 | undefined;
const dot = new DynamicsDot(new Vector3(), 10, { bounce: true });

const forceLineSegment = new LineSegment2D();

const getForceVector = () => {
  if (forceStartPoint && forceEndPoint) {
    return forceEndPoint.subtract(forceStartPoint);
  }

  return undefined;
};

const resetForce = () => {
  if (forceStartPoint && forceEndPoint) {
    forceStartPoint = undefined;
    forceEndPoint = undefined;
  }
};

const reset = () => {
  const massKg = util.parseFloatById('mass') || 10;

  dot.reset(new Vector3(), massKg, { bounce: true });
};

const update = (time: number) => {
  const forceVector = getForceVector();
  const force = forceVector && forceVector.multiplyScalar(FORCE_MULTIPLIER);

  if (forceStartPoint && forceEndPoint) {
    forceLineSegment.update(forceStartPoint, forceEndPoint);
  }

  dot.update(time, force);
};

const render = () => {
  layer.removeChildren();

  if (forceStartPoint && forceEndPoint) {
    forceLineSegment.konvaRender(layer);
  }

  dot.render(layer);

  layer.draw();
};

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

document.getElementById('resetButton')?.addEventListener('click', reset);

const animation = new Konva.Animation((frame) => {
  if (frame) {
    const timeDeltaSeconds = frame.timeDiff / 1000;
    update(timeDeltaSeconds);
    render();
    resetForce();
  }
});

animation.start();
