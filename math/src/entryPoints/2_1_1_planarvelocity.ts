import Konva from 'konva';

import * as util from '../util';
import { Ship } from '../objects';

const update = (time: number, ship: Ship) => {
  ship.update(time);
  util.logToDiv(ship.kinematics!.toString());
};

const render = (layer: Konva.Layer, ship: Ship) => {
  ship.updatePolygon();
  layer.draw();
};

export const run = () => {
  const { layer } = util.getDefaultKonvaStage2();

  const ship = new Ship(undefined, { hasKinematics: true, hasSteering: true });
  layer.add(ship.polygon);

  const animation = new Konva.Animation((frame) => {
    if (frame) {
      const timeDeltaSeconds = frame.timeDiff / 1000;
      update(timeDeltaSeconds, ship);
      render(layer, ship);
    }
  });

  animation.start();
};
