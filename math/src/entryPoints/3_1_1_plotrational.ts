import * as util from '../util';

import { axis2DRenderer, functionRenderer } from '../renderers';
import { PolynomialFunction, RationalFunction } from '../math/functions';

export const run = () => {
  const { layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);
  layer.draw();

  document.getElementById('drawButton')?.addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);

    const a_P = util.parseFloatById('a_P');
    const b_P = util.parseFloatById('b_P');
    const c_P = util.parseFloatById('c_P');

    const a_Q = util.parseFloatById('a_Q');
    const b_Q = util.parseFloatById('b_Q');
    const c_Q = util.parseFloatById('c_Q');

    const P = new PolynomialFunction(a_P, b_P, c_P);
    const Q = new PolynomialFunction(a_Q, b_Q, c_Q);
    const rationalFunction = new RationalFunction(P, Q);

    functionRenderer.plotFunction(rationalFunction, layer);
    layer.draw();
  });
}
