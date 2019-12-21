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
    const outputElemeent = document.getElementById('output');
    if (outputElemeent) {
      outputElemeent.innerText = line.toString();
      // Konva render
    }
  }
}
