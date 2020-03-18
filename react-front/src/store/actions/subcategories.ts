import Immutable from 'immutable';

import { Subcategory } from '../../models';

import { Action } from '.';

export const LOAD_SUBCATEGORIES = 'LOAD_SUBCATEGORIES';
export const MERGE_SUBCATEGORIES = 'MERGE_SUBCATEGORIES';

export const loadSubcategories = (): Action => ({
  type: LOAD_SUBCATEGORIES,
});

export const mergeSubcategories = (subcategories: Immutable.List<Subcategory>): Action => ({
  type: MERGE_SUBCATEGORIES,
  payload: {
    subcategories,
  },
});
