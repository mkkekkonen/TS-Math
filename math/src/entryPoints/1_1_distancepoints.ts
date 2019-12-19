import * as util from '../util';
import { axis2DRenderer } from '../renderers';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();
