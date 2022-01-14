import * as util from '../util';
import { Ground } from '../objects2';

export const run = () => {
  const { layer } = util.getDefaultKonvaStage2();

  const ground = new Ground(-5, 5, -4);
  ground.konvaDraw(layer);

  layer.draw();
};
