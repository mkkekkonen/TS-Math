import Konva from 'konva';

import * as util from '../util';
import { Ground, Block, ForceVector } from '../objects2';
import { Vector3 } from '../math';
import { Dynamics } from '../physics';
import { inputManager } from '../input';

const BLOCK_Y = -3.5;

const DEBUG = false;

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  const ground = new Ground(10, 10, -4);
  const accelerationOfGravity = new Vector3(0, -1.981, 0);

  let animation: Konva.Animation;
  let dragging = false;

  let frictionCoefficient = 0;
  let mass = 0;

  let _velocity = '';
  let _force = '';
  let _forceXAbs = 0;
  let _forceOfGravity = '';
  let _forcePullingUp = '';
  let _perpendicularForce = '';
  let _kineticFriction = 0;
  let _pullingForce = '';
  let _pullingForceDivided = '';
  let _slowDownForce = '';

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

  const getSlowDownForce = (velocity: Vector3, kineticFriction: number) => {
    const velocityRight = velocity.x > 0;
    const velocityLeft = velocity.x < 0;

    if (velocityRight) {
      return new Vector3(-kineticFriction, 0, 0);
    }
    if (velocityLeft) {
      return new Vector3(kineticFriction, 0, 0);
    }

    return new Vector3(0, 0, 0);
  };

  const getAcceleration = (velocity: Vector3) => {
    const forceXAbs = Math.abs(forceVector.force.x);

    const forceOfGravity = accelerationOfGravity.multiplyScalar(mass);
    const forcePullingUp = new Vector3(
      0,
      forceVector.force.y > 0 ? forceVector.force.y : 0,
      0,
    );

    const perpendicularForce = forceOfGravity.add(forcePullingUp);
    const kineticFriction = -perpendicularForce.multiplyScalar(frictionCoefficient).y;
    const kineticFrictionAbs = Math.abs(kineticFriction);

    if (DEBUG) {
      _velocity = velocity.toString();
      _force = forceVector.force.toString();
      _forceXAbs = forceXAbs;
      _forceOfGravity = forceOfGravity.toString();
      _forcePullingUp = forcePullingUp.toString();
      _perpendicularForce = perpendicularForce.toString();
      _kineticFriction = kineticFriction;
    }

    if (forceXAbs) {
      const pullX = kineticFrictionAbs > forceXAbs
        ? 0
        : forceXAbs - kineticFrictionAbs;

      const pullingForce = new Vector3(
        forceVector.force.x >= 0 ? pullX : -pullX,
        0,
        0,
      );

      const actualPullingForce = pullingForce.divideScalar(mass);

      if (DEBUG) {
        _pullingForce = pullingForce.toString();
        _pullingForceDivided = actualPullingForce.toString();
      }

      return actualPullingForce;
    }

    const slowDownForce = getSlowDownForce(velocity, kineticFriction)
      .divideScalar(mass);

    if (DEBUG) {
      _slowDownForce = slowDownForce.toString();
    }

    return slowDownForce;
  };

  const block = new Block(
    new Vector3(0, BLOCK_Y, 0),
    0,
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

            if (force.y < BLOCK_Y) {
              force.y = BLOCK_Y;
            }

            forceVector.update(0, { newPosition: block.position, newForce: force });
          } else {
            forceVector.update(0, { newPosition: block.position, newForce: new Vector3(0, 0, 0) });
          }

          if (DEBUG) {
            util.logToDiv(`velocity: ${_velocity}
force: ${_force}
force X abs: ${_forceXAbs}
force of gravity: ${_forceOfGravity}
force pulling up: ${_forcePullingUp}
perpendicular force: ${_perpendicularForce}
kinetic friction: ${_kineticFriction}
pulling force: ${_pullingForce}
pulling force divided: ${_pullingForceDivided}
slow down force: ${_slowDownForce}`);
          }

          forceVector.konvaDraw(layer);
        }
      },
      layer,
    );

    animation.start();
  });
};
