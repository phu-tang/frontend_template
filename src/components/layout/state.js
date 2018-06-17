import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { path } from 'lodash/fp';

const TOGGLE_MENU = 'CONFIG/TOGGLE_MENU';
const UPDATE_MENU = 'CONFIG/UPDATE_MENU';

const UPDATE_TITLE = 'CONFIG/UPDATE_TITLE';

export const updateTitleAction = title => ({
  type: UPDATE_TITLE,
  payload: title
});

export const updateMenuAction = payload => ({ type: UPDATE_MENU, payload });
export const toggleMenuAction = () => ({ type: TOGGLE_MENU });

const title = handleActions(
  {
    [UPDATE_TITLE]: (state, { payload }) => payload
  },
  ''
);
const sideMenuOpen = handleActions(
  {
    [TOGGLE_MENU]: state => !state,
    [UPDATE_MENU]: (state, { payload }) => payload
  },
  false
);
const reducers = combineReducers({
  sideMenuOpen,
  title
});

export const isOpenMenuSelector = path('config.sideMenuOpen');
export const titleSelector = path('config.title');

export default { config: reducers };
