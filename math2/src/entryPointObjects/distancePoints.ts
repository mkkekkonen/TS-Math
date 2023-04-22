import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../ioc/types';
import { ICanvas } from '../ioc/types/canvas';
import { IEntryPoint } from '../ioc/types/entryPoints';
import { ILineSegment2DRenderer } from '../ioc/types/geometryRenderers';

import { LineSegment2D } from '../geometry';

@injectable()
export class DistancePoints implements IEntryPoint {
  private _canvas: ICanvas;
  private _lineRenderer: ILineSegment2DRenderer;
  private _line: LineSegment2D = LineSegment2D.zero();

  public constructor(
    @inject(TYPES.Canvas) canvas: ICanvas,
    @inject(TYPES.LineSegment2DRenderer) lineRenderer: ILineSegment2DRenderer,
  ) {
    this._canvas = canvas;
    this._lineRenderer = lineRenderer;
  }

  public run = () => {
    window.alert('Hello from DistancePoints');
  };
}
