import Konva from 'konva';

import { Vector3 } from '../math';
import { defaultReverseViewportMatrix } from '../util';

export const getMouseWorldPosition = (stage: Konva.Stage) => {
  const pointerPosition = stage.getPointerPosition();

  if (!pointerPosition) {
    return new Vector3();
  }

  const positionVector = Vector3.convertKonvaVector(pointerPosition);

  return defaultReverseViewportMatrix.multiplyVector(positionVector);
};

export const initializeKeyboardInput = (
  keyDownCallback: (event: KeyboardEvent) => void,
  keyUpCallback: (event: KeyboardEvent) => void,
) => {
  window.addEventListener('keydown', keyDownCallback);
  window.addEventListener('keyup', keyUpCallback);
};
