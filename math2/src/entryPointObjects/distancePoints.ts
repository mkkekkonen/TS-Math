import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IEntryPoint } from '../ioc/types/entryPoints';

@injectable()
export class DistancePoints implements IEntryPoint {
  run = () => {
    window.alert('Hello from DistancePoints');
  };
}
