import { inputManager } from '.';

export class ObjectSteering2D {
  xAxis = 0;
  yAxis = 0;

  initialize = () => {
    inputManager.initializeKeyboardInput(
      (event: KeyboardEvent) => {
        switch (event.code) {
          case 'ArrowUp':
            this.yAxis = 1;
            break;
          case 'ArrowDown':
            this.yAxis = -1;
            break;
          case 'ArrowLeft':
            this.xAxis = -1;
            break;
          case 'ArrowRight':
            this.xAxis = 1;
            break;
          default:
            break;
        }
      },
      (event: KeyboardEvent) => {
        switch (event.code) {
          case 'ArrowUp':
          case 'ArrowDown':
            this.yAxis = 0;
            break;
          case 'ArrowLeft':
          case 'ArrowRight':
            this.xAxis = 0;
            break;
          default:
            break;
        }
      },
    );
  }
}
