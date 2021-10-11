import { AbstractFunction } from './abstractFunction';

export class RationalFunction extends AbstractFunction {
  P: AbstractFunction;
  Q: AbstractFunction;

  constructor(P: AbstractFunction, Q: AbstractFunction) {
    super();

    this.P = P;
    this.Q = Q;
  }

  getValue = (x: number) => {
    return this.P.getValue(x) / this.Q.getValue(x);
  }
}
