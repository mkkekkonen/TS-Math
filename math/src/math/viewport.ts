import { Matrix4x4 } from './matrix4x4';

import * as constants from '../constants';

export const createViewportMatrix = (
  worldWidth = constants.worldWidth,
  worldHeight = constants.worldHeight,
  screenWidth = constants.canvasWidthPx,
  screenHeight = constants.canvasHeightPx,
) => {
  const scaleX = screenWidth / worldWidth;
  const scaleY = screenHeight / worldHeight;
  const translateX = screenWidth / 2;
  const translateY = screenHeight / 2;

  const scalingMatrix = Matrix4x4.scale(scaleX, -scaleY, 1);
  const translationMatrix = Matrix4x4.translate(translateX, translateY, 0);
  return scalingMatrix.multiply(translationMatrix);
};

export const createReverseViewportMatrix = (
  worldWidth = constants.worldWidth,
  worldHeight = constants.worldHeight,
  screenWidth = constants.canvasWidthPx,
  screenHeight = constants.canvasHeightPx,
) => {
  const scaleX = screenWidth / worldWidth;
  const scaleY = screenHeight / worldHeight;
  const translateX = screenWidth / 2;
  const translateY = screenHeight / 2;

  const translationMatrix = Matrix4x4.translate(-translateX, -translateY, 0);
  const scalingMatrix = Matrix4x4.scale(scaleX, scaleY, 1);
  return translationMatrix.multiply(scalingMatrix);
};
