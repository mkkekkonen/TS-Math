import { TYPES as ENTRY_POINT_TYPES } from './entryPoints';
import { TYPES as CANVAS_TYPES } from './canvas';
import { TYPES as GEOMETRY_TYPES } from './geometryRenderers';
import { TYPES as INPUT_TYPES } from './input';

export const TYPES = {
  ...ENTRY_POINT_TYPES,
  ...CANVAS_TYPES,
  ...GEOMETRY_TYPES,
  ...INPUT_TYPES,
};
