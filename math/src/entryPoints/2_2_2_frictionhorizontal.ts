import Konva from 'konva';

import * as util from '../util';
import { Ground, Block } from '../objects2';
import { Vector3 } from '../math';

const getAcceleration = (block: Block) => new Vector3(0.1, 0, 0);

export const run = () => {
  const { layer } = util.getDefaultKonvaStage2();

  const ground = new Ground(10, 10, -4);
  ground.konvaDraw(layer);

  layer.draw();

  let animation: Konva.Animation;

  const block = new Block(
    new Vector3(0, 0, 0),
    2,
    getAcceleration,
  );
  block.konvaDraw(layer);
  layer.draw();

  document.getElementById('startButton')?.addEventListener('click', () => {
    animation = new Konva.Animation(
      (frame) => {
        if (frame) {
          block.update(frame.timeDiff / 1000);
          block.konvaDraw(layer);
        }
      },
      layer,
    );

    animation.start();
  });
};
