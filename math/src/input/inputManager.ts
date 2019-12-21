import Konva from 'konva';

import { Vector3 } from '../math';
import { defaultReverseViewportMatrix } from '../util';

export const getMouseWorldPosition = (stage: Konva.Stage) => {
  const pointerPosition = stage.getPointerPosition();
  const positionVector = Vector3.convertKonvaVector(pointerPosition!);

  return defaultReverseViewportMatrix.multiplyVector(positionVector);
};
