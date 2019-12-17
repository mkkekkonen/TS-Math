import { matrix, zeros, multiply, Matrix } from 'mathjs';
import { Vector3 } from './vector3';

export class Matrix4x4 {
  matrix: Matrix;

  constructor(initialMatrix?: number[][]) {
    if (!matrix) {
      this.matrix = zeros(4, 4) as Matrix;
    } else {
      this.matrix = matrix(initialMatrix!);
    }
  }

  multiplyVector = (vector: Vector3) => {
    const vectorArr = vector.asArray;
    const result = multiply(this.matrix, vectorArr);
    return new Vector3();
  }
}
