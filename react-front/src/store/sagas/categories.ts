import { put, takeEvery, all } from 'redux-saga/effects';

import Immutable from 'immutable';

import { LOAD_CATEGORIES, mergeCategories } from '../actions/categories';
import { categoryApi } from '../../services/api';
import { Category, ICategory } from '../../models';

function* loadCategories() {
  const categoryData = yield categoryApi.getAllCategories();
  const categoryArr = categoryData.map((dataItem: ICategory) => new Category(dataItem.id, dataItem.name));
  const categoryList = Immutable.fromJS(categoryArr);
  yield put(mergeCategories(categoryList));
}

export default function* root() {
  yield all([
    takeEvery(LOAD_CATEGORIES, loadCategories),
  ]);
}
