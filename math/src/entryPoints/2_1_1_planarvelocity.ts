import Konva from 'konva';

import * as util from '../util';
import { Ship } from '../objects';

const { layer } = util.getDefaultKonvaStage2();

const ship = new Ship(undefined, { hasKinematics: true, hasSteering: true });
layer.add(ship.polygon);

const update = (time: number) => {
  ship.update(time);
  util.logToDiv(ship.kinematics!.toString());
};

const render = () => {
  ship.updatePolygon();
  layer.draw();
};

const animation = new Konva.Animation((frame) => {
  if (frame) {
    const timeDeltaSeconds = frame.timeDiff / 1000;
    update(timeDeltaSeconds);
    render();
  }
});

animation.start();
