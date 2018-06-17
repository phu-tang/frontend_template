import history from '../state/history';

const LOCATION_NAVIGATION = 'location/navigation';

export const middleware = () => next => action => {
  if (action.type === LOCATION_NAVIGATION) {
    if (action.meta === 'push') {
      history.push(action.payload.href);
    } else {
      history.replace(action.payload.href);
    }
    return;
  }

  next(action);
};

export const navigatePageAction = (href, mode = 'push') => ({
  type: LOCATION_NAVIGATION,
  payload: { href },
  meta: mode
});
