import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import rootReducer from './store/reducers';
import {
  categorySagas,
  subcategorySagas,
  pageSagas,
  dataSagas,
} from './store/sagas';

import { MathRouter } from './components/router';

import resources from './resources';

import './global.css';

const sagaMiddleware = createSagaMiddleware();

const sagas = [
  categorySagas,
  subcategorySagas,
  pageSagas,
  dataSagas,
];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);

sagas.forEach(sagasItem => sagaMiddleware.run(sagasItem));

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const App = () => {
  return (
    <Provider store={store}>
      <MathRouter />
    </Provider>
  );
};
