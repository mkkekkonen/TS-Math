export const TYPES = {
  Canvas: Symbol('Canvas'),
};

export interface ICanvas {
  initialize: (ctx: any) => void;
}
