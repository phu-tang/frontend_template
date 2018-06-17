import { Router, Route } from 'react-router';
import React from 'react';
import PureLayout from './layout';
import history from '../../state/history';

export default () => (
  <Router history={history}>
    <Route path="/">
      <PureLayout />
    </Route>
  </Router>
);
