import { AbstractFunction } from './abstractFunction';

/**
 * f(x) = ax^2 + bx + c
 */
export class PolynomialFunction extends AbstractFunction {
  a = 0;
  b = 0;
  c = 0;

  constructor(a: number, b: number, c: number) {
    super();

    this.a = a;
    this.b = b;
    this.c = c;
  }

  getValue = (x: number) => (
    (this.a * (x ** 2)) + (this.b * x) + this.c
  )
}
