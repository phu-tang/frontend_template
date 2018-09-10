import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Snackbar from '@material-ui/core/Snackbar';

import {
  shouldShowNotificationSelector,
  lastNotificationMessagesSelector,
  hideNotification,
} from './state';

const mapStateToProps = createSelector(
  shouldShowNotificationSelector,
  lastNotificationMessagesSelector,
  (shouldShowNotification, notification) => ({
    shouldShowNotification,
    ...notification,
  }),
);

const mapDispatchToProps = (dispatch: Function) => ({
  requestTurnOffNotification: () => dispatch(hideNotification()),
  dispatch,
});

const mergeProps = (state, { ...actions, dispatch }, own) => ({
  ...state,
  ...own,
  ...actions,
  applyAction: () => dispatch(state.action),
});

const connectToRedux = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type NotificationPropsType = {
  shouldShowNotification: boolean,
  message: string,
  label: ?string,
  action: ?any,
  requestTurnOffNotification: Function,
  applyAction: Function,
};

const Notification = (
  {
    shouldShowNotification,
    message,
    label,
    applyAction,
    requestTurnOffNotification,
  }: NotificationPropsType,
) => (
  <Snackbar
    open={shouldShowNotification}
    message={message}
    action={label}
    // onActionTouchTap={applyAction}
    autoHideDuration={2000}
    onRequestClose={requestTurnOffNotification}
  />
);

export default connectToRedux(Notification);
