export abstract class AbstractFunction {
  abstract getValue: (x: number) => number;

  abstract getLimitAt: (x: number) => number;
}
