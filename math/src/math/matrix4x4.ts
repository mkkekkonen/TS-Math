import {
  matrix, zeros, multiply, transpose, Matrix,
} from 'mathjs';
import { Vector3 } from './vector3';

export class Matrix4x4 {
  public matrix: Matrix;

  constructor(initialMatrix?: number[][]) {
    if (!matrix) {
      this.matrix = zeros(4, 4) as Matrix;
    } else {
      this.matrix = transpose(matrix(initialMatrix!)) as Matrix;
    }
  }

  static scale = (x = 1, y = 1, z = 1) => new Matrix4x4([
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1],
  ]);

  static translate = (x = 0, y = 0, z = 0) => new Matrix4x4([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [x, y, z, 1],
  ]);

  multiply = (m: Matrix4x4) => {
    const result = multiply(this.matrix, transpose(m.matrix)) as Matrix;
    return new Matrix4x4(result.toArray() as number[][]);
  }

  multiplyVector = (vector: Vector3) => {
    const vectorArr = vector.asArray;
    const result = multiply(this.matrix, vectorArr) as Matrix;
    const x = result.get([0]);
    const y = result.get([1]);
    const z = result.get([2]);
    return new Vector3(x, y, z);
  }

  transpose = () => new Matrix4x4(this.matrix.toArray() as number[][]);
}
