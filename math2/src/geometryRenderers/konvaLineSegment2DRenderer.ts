import { injectable } from 'inversify';
import 'reflect-metadata';

import Konva from 'konva';

import { KonvaCanvas } from '../canvas';
import { LineSegment2D } from '../geometry/lineSegment2D';
import { ICanvas } from '../ioc/types/canvas';
import { ILineSegment2DRenderer } from '../ioc/types/geometryRenderers';

@injectable()
export class KonvaLineSegment2DRenderer implements ILineSegment2DRenderer {
  private _line?: Konva.Line;

  public render = (canvas: ICanvas, lineSegment: LineSegment2D) => {
    if (!this._line) {
      this._line = new Konva.Line({
        points: lineSegment.flatPoints,
      });
    } else {
      this._line.points(lineSegment.flatPoints);
    }

    const konvaCanvas = canvas as KonvaCanvas;
    konvaCanvas.layer?.add(this._line);
  };
}
