import * as util from '../util';
import * as constants from '../constants';
import { axis2DRenderer, dotRenderer } from '../renderers';
import { SlopeInterceptEquation } from '../math/lineEquations';
import { Vector3 } from '../math';

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

  const intersection = fixedLineEquation.lineIntersects(lineEquation);

  if (intersection === true) {
    util.logToDiv('Lines are equal');
  } else if (intersection) {
    util.logToDiv(`Intersection point: ${(intersection as Vector3).toString()}`);
    dotRenderer.addDotToLayer(intersection as Vector3, layer);
  } else if (!intersection) {
    util.logToDiv('Lines are parallel - no intersection');
  }

  layer.draw();
});
