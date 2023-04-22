import { Vector2 } from '../../linearAlgebra';

export const TYPES = {
  InputManager: Symbol('InputManager'),
};

export interface IInputManager {
  getPointerPosition: () => Vector2
}
