import { put, takeEvery, all } from 'redux-saga/effects';

import Immutable from 'immutable';

import { LOAD_CATEGORIES, mergeCategories } from '../actions/categories';
import { categoryApi } from '../../services/api';
import { Category, ICategory } from '../../models';

function* loadCategories() {
  try {
    const categoryData: ICategory[] = yield categoryApi.getAllCategories();
    const categoryArr = categoryData.map((dataItem: ICategory) =>
      new Category(dataItem.id, dataItem.name, dataItem.index));
    const categoryList = Immutable.List(categoryArr);
    yield put(mergeCategories(categoryList));
  } catch(e) {
    console.error(`Error fetching categories: ${e.message}`);
  }
}

export default function* root() {
  yield all([
    takeEvery(LOAD_CATEGORIES, loadCategories),
  ]);
}
