import { Matrix4x4, Vector3 } from '../../math';
import { createViewportMatrix, createReverseViewportMatrix } from '../../math/viewport';

it('creates correct viewport matrix', () => {
  const A = createViewportMatrix(10, 10, 640, 480);
  const expectedResult = new Matrix4x4([
    [64, 0, 0, 0],
    [0, -48, 0, 0],
    [0, 0, 1, 0],
    [320, 240, 0, 1],
  ]);
  expect(A.matrix).toEqual(expectedResult.matrix);
});

it('creates correct reverse viewport matrix', () => {
  const A = createReverseViewportMatrix(10, 10, 640, 480);
  const expectedResult = new Matrix4x4([
    [64, 0, 0, -320],
    [0, 48, 0, -240],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
  expect(A.matrix).toEqual(expectedResult.matrix);
});

it('transforms vector correctly', () => {
  const A = createReverseViewportMatrix(10, 10, 640, 480);
  const v = new Vector3(2, 2, 0);
  const resultant = A.multiplyVector(v);
  const expectedResult = new Vector3(128, 96, 0);
  expect(resultant.toString()).toEqual(expectedResult.toString());
});
