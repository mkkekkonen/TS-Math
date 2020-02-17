import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { Vector3 } from '../math';
import { PointSlopeEquation } from '../math/lineEquations';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const lineEquation = new PointSlopeEquation();

const updateLine = () => {
  const verticalChecked = (document.getElementById('vertical') as HTMLInputElement).checked;
  const slope = verticalChecked ? NaN : util.parseFloatById('slope');

  const pointX = util.parseFloatById('x');
  const pointY = util.parseFloatById('y');

  const point = new Vector3(pointX, pointY);

  lineEquation.update({ point, slope });
};

document.getElementById('drawButton')?.addEventListener('click', () => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);

  updateLine();

  lineEquation.renderLine(layer);
  layer.draw();

  util.logToDiv(lineEquation.toString());
});
