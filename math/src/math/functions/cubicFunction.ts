import { AbstractFunction } from './abstractFunction';

/**
 * f(x) = ax^3 + bx^2 + cx + d
 */
export class CubicFunction extends AbstractFunction {
  a = 0;
  b = 0;
  c = 0;
  d = 0;

  constructor(a: number, b: number, c: number, d: number) {
    super();

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  getValue = (x: number) => (
    (this.a * (x ** 3)) + (this.b * (x ** 2)) + (this.c * x) + this.d
  );

  getLimitAt = (x: number) => this.getValue(x);
}
