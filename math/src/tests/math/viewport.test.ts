import { createViewportMatrix, createReverseViewportMatrix, Matrix4x4 } from "../../math";

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
    [0, 0, 0, 1]
  ]);
  expect(A.matrix).toEqual(expectedResult.matrix);
})
