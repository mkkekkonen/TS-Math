import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './store/reducers';
import { categorySagas, subcategorySagas, pageSagas } from './store/sagas';

import { MathRouter } from './components/router';

import './global.css';

const sagaMiddleware = createSagaMiddleware();

const sagas = [
  categorySagas,
  subcategorySagas,
  pageSagas,
];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);

sagas.forEach(sagasItem => sagaMiddleware.run(sagasItem));

export const App = () => {
  return (
    <Provider store={store}>
      <MathRouter />
    </Provider>
  );
};
