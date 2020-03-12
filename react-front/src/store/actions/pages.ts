import Immutable from 'immutable';

import { Page } from '../../models';

import { Action } from '.';

export const LOAD_PAGES = 'LOAD_PAGES';
export const MERGE_PAGES = 'MERGE_PAGES';

export const loadPages = (): Action => ({
  type: LOAD_PAGES,
});

export const mergePages = (pages: Immutable.List<Page>): Action => ({
  type: MERGE_PAGES,
  payload: {
    pages,
  },
});
