import { put, takeEvery, all } from 'redux-saga/effects';

import { LOAD_DATA } from '../actions/data';
import { loadCategories } from '../actions/categories';
import { loadSubcategories } from '../actions/subcategories';
import { loadPages } from '../actions/pages';

function* loadData() {
  try {
    yield put(loadCategories());
    yield put(loadSubcategories());
    yield put(loadPages());
  } catch(e) {
    console.error(`Error loading data: ${e.message}`);
  }
}

export default function* root() {
  yield all([
    takeEvery(LOAD_DATA, loadData),
  ]);
}
