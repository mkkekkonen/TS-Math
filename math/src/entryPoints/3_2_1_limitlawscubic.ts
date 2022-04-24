import * as util from '../util';

import { axis2DRenderer, functionRenderer } from '../renderers';
import { CubicFunction } from '../math/functions';

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);
  layer.draw();

  let drawn = false;

  stage.on('mousemove', (evt) => {
    const { offsetX, offsetY } = evt.evt;
  });

  document.getElementById('drawButton')?.addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);

    const a = util.parseFloatById('a');
    const b = util.parseFloatById('b');
    const c = util.parseFloatById('c');
    const d = util.parseFloatById('d');

    const cubicFunction = new CubicFunction(a, b, c, d);

    functionRenderer.plotFunction(cubicFunction, layer);
    layer.draw();

    drawn = true;
  });
};
