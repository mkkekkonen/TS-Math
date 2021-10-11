import { Container } from 'inversify';
import 'reflect-metadata';

import { AbstractLineSegment2D, KonvaLineSegment2D } from '../graphics/lineSegment2D';
import { LineSegment2DNew } from '../math/geometry';

import { TYPES } from './types';

export const initContainer = () => {
  const container = new Container();

  // Konva
  container.bind<AbstractLineSegment2D>(TYPES.lineSegment2D).to(KonvaLineSegment2D);

  container.bind<LineSegment2DNew>(TYPES.lineSegment2DMath).to(LineSegment2DNew);
};
