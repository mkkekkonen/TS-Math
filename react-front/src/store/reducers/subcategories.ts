import Immutable from 'immutable';

import { Action } from '../actions';
import { MERGE_SUBCATEGORIES } from '../actions/subcategories';

import { Subcategory } from '../../models';

import { convertModelListToIdMap } from '../../services/utils';

const initialState = Immutable.Map<Subcategory>({});

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case MERGE_SUBCATEGORIES: {
      return state.merge(convertModelListToIdMap(action.payload.subcategories));
    }

    default:
      return state;
  }
}
