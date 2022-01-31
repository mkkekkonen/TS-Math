import Konva from 'konva';

import * as util from '../util';
import { Ground, Block, ForceVector } from '../objects2';
import { Vector3 } from '../math';
import { Dynamics } from '../physics';
import { inputManager } from '../input';

const getAcceleration = () => new Vector3(0.1, 0, 0);

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  const ground = new Ground(10, 10, -4);
  let animation: Konva.Animation;
  let dragging = false;

  stage.on('mousedown', () => {
    dragging = true;
  });

  stage.on('mouseup', () => {
    dragging = false;
  });

  ground.konvaDraw(layer);

  layer.draw();

  const block = new Block(
    new Vector3(0, 0, 0),
    2,
    new Dynamics(getAcceleration),
  );

  const forceVector = new ForceVector({
    startPoint: block.position,
  });

  block.konvaDraw(layer);
  forceVector.konvaDraw(layer);
  layer.draw();

  document.getElementById('startButton')?.addEventListener('click', () => {
    animation = new Konva.Animation(
      (frame) => {
        if (frame) {
          const timeDelta = frame.timeDiff / 1000;

          block.update(timeDelta);
          block.konvaDraw(layer);

          if (dragging) {
            const worldMousePosition = inputManager.getMouseWorldPosition(stage);
            const force = worldMousePosition.subtract(block.position);

            forceVector.update(0, { newPosition: block.position, newForce: force });
          } else {
            forceVector.update(0, { newPosition: block.position, newForce: new Vector3(0, 0, 0) });
          }

          forceVector.konvaDraw(layer);
        }
      },
      layer,
    );

    animation.start();
  });
};
