import { ICanvas } from './canvas';

export const TYPES = {
  LineSegment2D: Symbol('LineSegment'),
};

export interface IDrawable {
  draw: (canvas: ICanvas) => void
}
