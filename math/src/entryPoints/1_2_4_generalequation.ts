import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { GeneralFormEquation } from '../math/lineEquations';

const updateGeneralFormLine = (lineEquation: GeneralFormEquation) => {
  const a = util.parseFloatById('a');
  const b = util.parseFloatById('b');
  const c = util.parseFloatById('c');

  lineEquation.update({ a, b, c });
};

export const run = () => {
  const { layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);
  layer.draw();

  const lineEquation = new GeneralFormEquation();

  document.getElementById('drawButton')?.addEventListener('click', () => {
    layer.removeChildren();
    axis2DRenderer.addAxesToLayer(layer);

    updateGeneralFormLine(lineEquation);

    lineEquation.renderLine(layer);
    layer.draw();

    util.logToDiv(lineEquation.toString());
  });
};
