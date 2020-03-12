import Immutable from 'immutable';

import { Category } from '../../models';

import { Action } from '.';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const MERGE_CATEGORIES = 'MERGE_CATEGORIES';

export const loadCatgories = (): Action => ({
  type: LOAD_CATEGORIES,
});

export const mergeCategories = (categories: Immutable.List<Category>): Action => ({
  type: MERGE_CATEGORIES,
  payload: {
    categories,
  },
});
