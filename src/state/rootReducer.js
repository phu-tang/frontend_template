import { always } from 'lodash/fp';
import { reducers as apiCalls } from 'redux-api-call';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import config from '../components/layout/state';
import notificationState from '../components/notification/state';

const VERSION = process.env.REACT_APP_VERSION || 'DEVELOPMENT';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

export default persistCombineReducers(persistConfig, {
  form: formReducer,
  routing: routerReducer,
  version: always(VERSION),
  ...config,
  ...notificationState
});
