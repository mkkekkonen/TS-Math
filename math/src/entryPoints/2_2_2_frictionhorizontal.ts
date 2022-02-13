import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { Ground, Block, ForceVector } from '../objects2';
import { Vector3 } from '../math';
import { Dynamics } from '../physics';
import { inputManager } from '../input';

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  const ground = new Ground(10, 10, -4);
  const accelerationOfGravity = new Vector3(0, -0.981, 0);

  let animation: Konva.Animation;
  let dragging = false;

  let frictionCoefficient = 0;
  let mass = 0;

  stage.on('mousedown', () => {
    dragging = true;
  });

  stage.on('mouseup', () => {
    dragging = false;
  });

  ground.konvaDraw(layer);

  layer.draw();

  const forceVector = new ForceVector({
    startPoint: new Vector3(0, 0, 0),
  });

  const getAcceleration = () => {
    const perpendicularForce = accelerationOfGravity.multiplyScalar(mass);
    const kineticFriction = -perpendicularForce.multiplyScalar(frictionCoefficient).y;

    const forceXAbs = Math.abs(forceVector.force.x);
    const pullX = kineticFriction > forceXAbs
      ? 0
      : forceXAbs - kineticFriction;

    const pullingForce = new Vector3(
      forceVector.force.x >= 0 ? pullX : -pullX,
      0,
      0,
    );
    return pullingForce.divideScalar(mass);
  };

  const block = new Block(
    new Vector3(0, 0, 0),
    2,
    new Dynamics(getAcceleration),
  );

  block.konvaDraw(layer);
  forceVector.konvaDraw(layer);
  layer.draw();

  document.getElementById('startButton')?.addEventListener('click', () => {
    frictionCoefficient = util.parseFloatById('mu');
    mass = util.parseFloatById('m');

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

          util.logToDiv(`force x: ${forceVector.force.x}
block accel: ${block.dynamics!.getAcceleration()}
block velocity: ${block.velocity.x}`);

          forceVector.konvaDraw(layer);
        }
      },
      layer,
    );

    animation.start();
  });
};
