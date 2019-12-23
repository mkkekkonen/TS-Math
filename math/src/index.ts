// FOR DEBUGGING

import { Vector3 } from './math';
import { createViewportMatrix, createReverseViewportMatrix } from './math/viewport';

const M = createViewportMatrix(10, 10, 480, 480);
const rM = createReverseViewportMatrix(10, 10, 480, 480);
const v = new Vector3(240, 240, 0);

const resultant = rM.multiplyVector(v);
const res2 = M.multiplyVector(resultant);

console.log(rM.matrix);
console.log('reverse:');
console.log(resultant.toString());
console.log('viewport:');
console.log(res2.toString());
