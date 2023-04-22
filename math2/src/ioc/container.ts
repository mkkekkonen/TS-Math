import { Container } from 'inversify';

import { TYPES } from './types';
import { IEntryPoint } from './types/entryPoints';
import { ICanvas } from './types/canvas';
import { ILineSegment2DRenderer } from './types/geometryRenderers';

import { DistancePoints } from '../entryPointObjects/distancePoints';
import { KonvaCanvas } from '../canvas';
import { KonvaLineSegment2DRenderer } from '../geometryRenderers';

const wireUpEntryPoints = (container: Container) => {
  container.bind<IEntryPoint>(TYPES.DistancePoints).to(DistancePoints);
};

const wireUpCanvas = (container: Container) => {
  container.bind<ICanvas>(TYPES.Canvas).to(KonvaCanvas).inSingletonScope();
};

const wireUpGeometry = (container: Container) => {
  container.bind<ILineSegment2DRenderer>(TYPES.LineSegment2DRenderer).to(KonvaLineSegment2DRenderer);
};

const container = new Container();
wireUpEntryPoints(container);
wireUpCanvas(container);
wireUpGeometry(container);

export { container };
