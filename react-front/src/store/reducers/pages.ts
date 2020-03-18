import Immutable from 'immutable';

import { Action } from '../actions';
import { MERGE_PAGES } from '../actions/pages';

import { Page } from '../../models';

import { convertModelListToIdMap } from '../../services/utils';

const initialState = Immutable.Map<Page>({});

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case MERGE_PAGES: {
      return state.merge(convertModelListToIdMap(action.payload.pages));
    }

    default:
      return state;
  }
}
