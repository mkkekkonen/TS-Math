import { Action } from '.';

export const LOAD_DATA = 'LOAD_DATA';

export const loadData = (): Action => ({
  type: LOAD_DATA,
});
