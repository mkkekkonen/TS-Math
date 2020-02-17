import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { SlopeInterceptEquation } from '../math/lineEquations';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const lineEquation = new SlopeInterceptEquation();

const updateSlopeInterceptLine = () => {
  const slope = util.parseFloatById('k');
  const yIntercept = util.parseFloatById('b');

  lineEquation.update({ slope, yIntercept });
};

document.getElementById('drawButton')?.addEventListener('click', () => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);

  updateSlopeInterceptLine();

  lineEquation.renderLine(layer);
  layer.draw();

  util.logToDiv(lineEquation.toString());
});
