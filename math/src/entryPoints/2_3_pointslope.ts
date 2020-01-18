import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { Vector3 } from '../math';
import { PointSlopeEquation } from '../math/lineEquations';

const { layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const lineEquation = new PointSlopeEquation();

const updateLine = () => {
};
