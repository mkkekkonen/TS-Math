import { all } from 'redux-saga/effects';

import categorySagas from './categories';

export default function* root() {
  yield all([
    categorySagas,
  ]);
};
