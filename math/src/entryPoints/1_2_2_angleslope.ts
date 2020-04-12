import Konva from 'konva';

import * as util from '../util';
import { axis2DRenderer } from '../renderers';
import { LineSegment2D } from '../math/geometry';

const clickTapHandler = (stage: Konva.Stage, layer: Konva.Layer, line: LineSegment2D) => {
  layer.removeChildren();
  axis2DRenderer.addAxesToLayer(layer);
  util.updateLineSegmentOnClick(line, stage);

  if (line.startPoint && line.endPoint) {
    util.logToDiv(line.toString({ slope: true, directionalAngle: true }));
    line.konvaRender(layer);
    layer.draw();
  }
};

export const run = () => {
  const { stage, layer } = util.getDefaultKonvaStage2();
  axis2DRenderer.addAxesToLayer(layer);
  layer.draw();

  const line = new LineSegment2D();

  stage.on('click', () => clickTapHandler(stage, layer, line));
  // stage.on('tap', () => clickTapHandler(stage, layer, line));
};
