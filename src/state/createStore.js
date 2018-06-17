import { applyMiddleware, createStore, compose } from 'redux';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import compact from 'lodash/fp/compact';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epic';
import history from './history';
import rootReducer from './rootReducer';
import arrayMiddleware from '../utils/arrayMiddleware';
import apiMiddleware from './api';
import emptyMiddleware from '../utils/emptyMiddleware';
import { middleware as locationMiddleWare } from '../utils/locationMiddleware';

const epicMiddleware = createEpicMiddleware(rootEpic);

if (module.hot) {
  module.hot.accept('../epic', () => {
    // eslint-disable-next-line global-require
    const nextRootEpic = require('../epic').default;

    epicMiddleware.replaceEpic(nextRootEpic);
  });
}

const enhancers = compact([
  applyMiddleware(
    emptyMiddleware,
    arrayMiddleware,
    thunk,
    apiMiddleware,
    locationMiddleWare,
    epicMiddleware,
    routerMiddleware(history)
  ),
  // autoRehydrate(),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
]);

export default () => {
  const store = createStore(rootReducer, {}, compose(...enhancers));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
