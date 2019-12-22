import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { LineSegment2D } from '../math/geometry';

const { stage, layer } = util.getDefaultKonvaStage2();
axis2DRenderer.addAxesToLayer(layer);
layer.draw();

const line = new LineSegment2D();

const clickTapHandler = () => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);

  util.updateLineSegmentOnClick(line, stage);

  if (line.startPoint && line.endPoint) {
    const outputElement = document.getElementById('output');
    if (outputElement) {
      outputElement.innerText = line.toString();
    }

    line.konvaRender(layer);
    layer.draw();
  }
};

stage.on('click', clickTapHandler);
stage.on('tap', clickTapHandler);
