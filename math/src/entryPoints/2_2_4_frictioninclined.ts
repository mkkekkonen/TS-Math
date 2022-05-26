import Konva from 'konva';

import * as util from '../util';
import * as constants from '../constants';
import { InclinedPlane, Ground } from '../objects2';

const GROUND_Y = -4;

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  const ground = new Ground(constants.worldWidth, constants.worldHeight, GROUND_Y);
  let inclinedPlane: InclinedPlane;

  let angle: number;
  let frictionCoefficient: number;
  let mass: number;

  document.getElementById('startButton')?.addEventListener('click', () => {
    layer.removeChildren();

    angle = util.parseFloatById('alpha');
    frictionCoefficient = util.parseFloatById('mu');
    mass = util.parseFloatById('m');

    inclinedPlane = new InclinedPlane(constants.worldWidth - 2, angle, GROUND_Y);

    ground.konvaDraw(layer);
    inclinedPlane.konvaDraw(layer);

    layer.draw();
  });
};
