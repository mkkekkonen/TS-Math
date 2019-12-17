import Konva from 'konva';

import { worldWidth, worldHeight } from '../constants';
import { Vector3 } from '../math';

const xAxisStartPoint = new Vector3(-(worldWidth / 2), 0, 0);
const xAxisEndPoint = new Vector3(worldWidth / 2, 0, 0);
const yAxisStartPoint = new Vector3(0, -(worldHeight / 2), 0);
const yAxisEndPoint = new Vector3(0, worldHeight / 2, 0);

export const addAxesToLayer = (layer: Konva.Layer) => {
  
}
