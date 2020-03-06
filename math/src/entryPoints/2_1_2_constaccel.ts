import Konva from 'konva';

import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { Vector3 } from '../math';
import { TimeDot } from '../objects';

const start = (dot: TimeDot) => {
  const initialVelocityX = util.parseFloatById('v0x');
  const initialVelocityY = util.parseFloatById('voy');
  const initialVelocity = new Vector3(initialVelocityX, initialVelocityY);

  const accelerationX = util.parseFloatById('ax');
  const accelerationY = util.parseFloatById('ay');
  const acceleration = new Vector3(accelerationX, accelerationY);

  dot.reset(new Vector3(), initialVelocity, acceleration);
};

const update = (time: number, dot: TimeDot) => {
  dot.update(time);
};

const render = (layer: Konva.Layer, dot: TimeDot) => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);
  dot.render(layer);
  layer.draw();
  util.logToDiv(dot.kinematics.toString());
};

export const run = () => {
  const { layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);
  layer.draw();

  let running = false;

  const dot = new TimeDot();

  const reset = () => {
    running = false;
    dot.reset();
  };

  document.getElementById('startButton')?.addEventListener('click', () => start(dot));
  document.getElementById('resetButton')?.addEventListener('click', reset);

  const animation = new Konva.Animation((frame) => {
    if (frame) {
      const timeDeltaSeconds = frame.timeDiff / 1000;
      update(timeDeltaSeconds, dot);
      render(layer, dot);
    }
  });

  animation.start();
};
