import { Vector3 } from '../math';

export const worldWidth = 10;
export const worldHeight = 10;

export const canvasWidthPx = 480;
export const canvasHeightPx = 480;

export const black = '#000';
export const red = '#f00';
export const darkGrey = '#999';

export const strokeWidth = 2;
export const dotRadius = 4;

export const accelerationGravity = new Vector3(0, -9.81);

export enum Sides {
  NONE = 0,
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}
