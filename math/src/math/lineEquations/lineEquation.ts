import Konva from 'konva';

import { Matrix4x4 } from '..';

export interface LineEquation {
  update: (params: any) => void;
  render: (layer: Konva.Layer, worldWidth: number, worldHeight: number, viewportMatrix: Matrix4x4) => void;
}
