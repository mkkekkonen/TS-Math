import { put, takeEvery, all } from 'redux-saga/effects';

import Immutable from 'immutable';

import { LOAD_SUBCATEGORIES, mergeSubcategories } from '../actions/subcategories';
import { subcategoryApi } from '../../services/api';
import { Subcategory, ISubcategory } from '../../models';

function* loadSubcategories() {
  try {
    const subcategoryData: ISubcategory[] = yield subcategoryApi.getAllSubcategories();
    const subcategoryArr = subcategoryData.map((dataItem: ISubcategory) => new Subcategory(
      dataItem.id,
      dataItem.name,
      dataItem.categoryId,
      dataItem.index,
    ));
    const subcategoryList = Immutable.List(subcategoryArr);
    yield put(mergeSubcategories(subcategoryList));
  } catch(e) {
    console.error(`Error fetching subcategories: ${e.message}`);
  }
}

export default function* root() {
  yield all([
    takeEvery(LOAD_SUBCATEGORIES, loadSubcategories),
  ]);
}
