import { container } from '../ioc/container';
import { TYPES, IEntryPoint } from '../ioc/types/entryPoints';

const entryPoint = container.get<IEntryPoint>(TYPES.DistancePoints);
export default entryPoint.run;
