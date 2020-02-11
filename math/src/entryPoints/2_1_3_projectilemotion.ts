import * as util from '../util';
import * as constants from '../constants';
import { LineSegment2D } from '../math/geometry';
import { ProjectileDot } from '../objects';
import { Vector3 } from '../math';
import { axis2DRenderer } from '../renderers';
import { inputManager } from '../input';

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

const update = (time: number) => {
  if (running) {
    projectile.update(time);
  }

  const mouseVector = inputManager.getMouseWorldPosition(stage);
  lineSegment.update(initialPosition, mouseVector);
};

const render = () => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);

  lineSegment.konvaRender(layer);
  projectile.render(layer);

  layer.draw();
  util.logToDiv('');
};


