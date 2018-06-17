import { Route } from 'react-router-dom';
import React from 'react';
import { EnhanceAppbar, EnhanceDrawer } from './appbar';
//page
import Notification from '../notification';
import Home from '../home';

const PureLayout = () => (
  <div
    style={{
      minHeight: '100vh',
      width: '100%'
    }}>
    <EnhanceAppbar />
    <EnhanceDrawer />
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/vote" component={Vote} />
    <Route exact path="/setting" component={Setting} />
    <Route exact path="/faucet" component={Faucet} />
    <Route exact path="/how" component={HowTo} /> */}
    <Notification />
  </div>
);

export default PureLayout;
