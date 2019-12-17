import Konva from 'konva';

import * as constants from '../constants';

export const getDefaultKonvaStage = () => new Konva.Stage({
  container: document.getElementById('canvasContainer') as HTMLDivElement,
  width: constants.canvasWidthPx,
  height: constants.canvasHeightPx,
});

export const getDefaultKonvaStage2 = () => {
  const stage = getDefaultKonvaStage();
  const layer = new Konva.Layer();
  stage.add(layer);
  return { stage, layer };
};
