import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IInputManager } from '../ioc/types/input';
import { ICanvas } from '../ioc/types/canvas';
import { TYPES } from '../ioc/types';

import { Vector2 } from '../linearAlgebra';

@injectable()
export class KonvaInputManager implements IInputManager {
  private _canvas: ICanvas;

  public constructor(
    @inject(TYPES.Canvas) canvas: ICanvas,
  ) {
    this._canvas = canvas;
  }

  getPointerPosition = () => {

  };
}
