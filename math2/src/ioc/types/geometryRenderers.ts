import { ICanvas } from './canvas';
import { LineSegment2D } from '../../geometry';

export const TYPES = {
  LineSegment2DRenderer: Symbol('LineSegment2DRenderer'),
};

export interface ILineSegment2DRenderer {
  render: (canvas: ICanvas, lineSegment: LineSegment2D) => void
}
