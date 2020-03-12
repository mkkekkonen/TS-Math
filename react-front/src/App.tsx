import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './store/reducers';
import sagas from './store/sagas';
import categorySagas from './store/sagas/categories';

import { HomePage } from './pages';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(categorySagas);

export const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};
