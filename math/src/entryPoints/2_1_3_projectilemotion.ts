import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { LineSegment2D } from '../math/geometry';
import { ProjectileDot } from '../objects';
import { Vector3 } from '../math';
import { axis2DRenderer } from '../renderers';
import { inputManager } from '../input';

const update = (
  stage: Konva.Stage,
  time: number,
  running: boolean,
  projectile: ProjectileDot,
  lineSegment: LineSegment2D,
  initialPosition: Vector3,
) => {
  if (running) {
    projectile.update(time);
  }

  const mouseVector = inputManager.getMouseWorldPosition(stage);
  lineSegment.update(initialPosition, mouseVector);
};

const render = (layer: Konva.Layer, lineSegment: LineSegment2D, projectile: ProjectileDot) => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);

  lineSegment.konvaRender(layer);
  projectile.render(layer);

  layer.draw();
  util.logToDiv(projectile.kinematics.toString());
};

const clickTapHandler = (running: boolean, reset: Function, start: Function) => {
  if (running) {
    reset();
  }
  start();
};

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);

  layer.draw();

  let running = false;

  const initialPosition = new Vector3(-constants.worldWidth / 2, 0);
  const lineSegment = new LineSegment2D(initialPosition, new Vector3());

  const projectile = new ProjectileDot(initialPosition);

  const displacement = new Vector3(5, 0);

  const start = () => {
    const mouseVector = inputManager.getMouseWorldPosition(stage);
    const initialVelocity = mouseVector.add(displacement);

    projectile.reset(initialPosition, initialVelocity);

    running = true;
  };

  const reset = () => {
    running = false;
    projectile.reset(initialPosition);
  };

  document.getElementById('resetButton')?.addEventListener('click', reset);

  stage.on('click', () => clickTapHandler(running, reset, start));
  // stage.on('tap', () => clickTapHandler(running, reset, start));

  const animation = new Konva.Animation((frame) => {
    if (frame) {
      const timeDeltaSeconds = frame.timeDiff / 1000;
      update(stage, timeDeltaSeconds, running, projectile, lineSegment, initialPosition);
      render(layer, lineSegment, projectile);
    }
  });

  animation.start();
};
