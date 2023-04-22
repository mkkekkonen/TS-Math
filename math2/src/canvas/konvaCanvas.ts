import { injectable } from 'inversify';
import 'reflect-metadata';

import Konva from 'konva';

import { ICanvas } from '../ioc/types/canvas';
import * as constants from '../constants';

interface IInitializeCtx {
  containerId?: string
  width?: number
  height?: number
}

@injectable()
export class KonvaCanvas implements ICanvas {
  private _stage?: Konva.Stage;
  private _layer?: Konva.Layer;

  public initialize = (ctx: IInitializeCtx = {}) => {
    const { containerId, width, height } = ctx;
    const container = document.getElementById(containerId || constants.DEFAULT_CONTAINER_ID) as HTMLDivElement;

    this._stage = new Konva.Stage({
      container,
      width: width || constants.DEFAULT_CANVAS_DIMENSIONS,
      height: height || constants.DEFAULT_CANVAS_DIMENSIONS,
    });

    this._layer = new Konva.Layer();
    this._stage.add(this._layer);
  };

  public get stage() {
    return this._stage;
  }

  public get layer() {
    return this._layer;
  }
}
