import { put, takeEvery, all } from 'redux-saga/effects';

import Immutable from 'immutable';

import { LOAD_PAGES, mergePages } from '../actions/pages';
import { pageApi } from '../../services/api';
import { Page, IPage } from '../../models';

function* loadPages() {
  try {
    const pageData: IPage[] = yield pageApi.getAllPages();
    const pageArr = pageData.map((dataItem: IPage) => new Page(
      dataItem.id,
      dataItem.name,
      dataItem.urlTitle,
      dataItem.subcategoryId,
      dataItem.index,
    ));
    const pageList = Immutable.List(pageArr);
    yield put(mergePages(pageList));
  } catch(e) {
    console.error(`Error fetching pages: ${e.message}`);
  }
}

export default function* root() {
  yield all([
    takeEvery(LOAD_PAGES, loadPages),
  ]);
}
