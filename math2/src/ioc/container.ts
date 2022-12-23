import { Container } from 'inversify';

import { TYPES as ENTRY_POINT_TYPES, IEntryPoint } from './types/entryPoints';
import { DistancePoints } from '../entryPointObjects/distancePoints';

const wireUpEntryPoints = (container: Container) => {
  container.bind<IEntryPoint>(ENTRY_POINT_TYPES.DistancePoints).to(DistancePoints);
};

const container = new Container();
wireUpEntryPoints(container);

export { container };
