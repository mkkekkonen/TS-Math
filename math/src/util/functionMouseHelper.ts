import { Vector3 } from '../math';
import { AbstractFunction } from '../math/functions';

export const getNearestCoordinates = (func: AbstractFunction, mouseWorldPosition: Vector3) => {
  const x = Math.round(mouseWorldPosition.x);
  const y = func.getValue(x);

  return new Vector3(x, y, 0);
};
