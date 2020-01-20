import * as util from '../util';
import * as constants from '../constants';
import { axis2DRenderer } from '../renderers';
import { SlopeInterceptEquation } from '../math/lineEquations';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);

const fixedLineEquation = new SlopeInterceptEquation(1.5, 1, constants.darkGrey);

const lineEquation = new SlopeInterceptEquation();

const updateLine = () => {
  const slope = util.parseFloatById('k');
  const yIntercept = util.parseFloatById('b');

  lineEquation.update({ slope, yIntercept });
};

fixedLineEquation.renderLine(layer);
layer.draw();

document.getElementById('drawButton')?.addEventListener('click', () => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);

  updateLine();

  fixedLineEquation.renderLine(layer);
  lineEquation.renderLine(layer);

  // jäi tähän
});
