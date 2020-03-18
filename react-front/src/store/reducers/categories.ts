import Immutable from 'immutable';

import { Action } from '../actions';
import { MERGE_CATEGORIES } from '../actions/categories';

import { Category } from '../../models';

import { convertModelListToIdMap } from '../../services/utils';

const initialState = Immutable.Map<Category>({});

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case MERGE_CATEGORIES: {
      return state.merge(convertModelListToIdMap(action.payload.categories));
    }

    default:
      return state;
  }
}
