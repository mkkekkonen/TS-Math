import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers';

import { HomePage } from './pages';

const store = createStore(
  rootReducer,
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f,
);

export const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};
