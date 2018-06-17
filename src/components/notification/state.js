import { combineReducers } from 'redux';
import always from 'lodash/fp/always';

type NotificationMessageType = {
  message: string,
  label?: string,
  action?: any
};

const EMPTY_MESSAGE = { message: '' };

// SELECTORS
export const lastNotificationMessagesSelector = (state: any) =>
  state.notification.lastNotificationMessage;

export const shouldShowNotificationSelector = (state: any) =>
  state.notification.lastNotificationMessage !== EMPTY_MESSAGE;

// ACTIONS
const TURN_OFF_NOTIFICATIONS = 'card/actions/TURN_OFF_NOTIFICATIONS';
const TURN_ON_NOTIFICATIONS = 'card/actions/TURN_ON_NOTIFICATIONS';

// ACTION CREATORS
export const hideNotification = always({
  type: TURN_OFF_NOTIFICATIONS
});

export const showNotification = (message: string) => ({
  type: TURN_ON_NOTIFICATIONS,
  payload: { message }
});

export const showNotificationWithAction = (
  message: string,
  label: string,
  action: any
) => ({
  type: TURN_ON_NOTIFICATIONS,
  payload: {
    message,
    label,
    action
  }
});

// REDUCERS
function lastNotificationMessage(
  state: NotificationMessageType = EMPTY_MESSAGE,
  { type, payload }
): NotificationMessageType {
  if (type === TURN_OFF_NOTIFICATIONS) {
    return EMPTY_MESSAGE;
  }

  if (type === TURN_ON_NOTIFICATIONS) {
    return payload;
  }

  return state;
}

const reducers = combineReducers({
  lastNotificationMessage
});

export default { notification: reducers };
