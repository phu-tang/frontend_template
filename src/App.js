import { Provider } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Layout from './components/layout';
import THEME_CONFIG from './config/theme.json';

const theme = {
  appBar: {
    color: THEME_CONFIG.colors.bar
  },
  palette: {
    primary1Color: THEME_CONFIG.colors.primary,
    accent1Color: THEME_CONFIG.colors.secondary
  }
};

type AppPropsType = {
  store: any,
  rehydrated: boolean
};

const App = ({ store, rehydrated }: AppPropsType) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <div name="application">
        {rehydrated ? <Layout /> : <CircularProgress size={60} thickness={7} />}
      </div>
    </MuiThemeProvider>
  </Provider>
);
const enhance = compose(
  withState('rehydrated', 'completeRehydrated', false),
  lifecycle({
    componentDidMount() {
      // eslint-disable-next-line immutable/no-this
      persistStore(this.props.store, {}, () => {
        this.props.completeRehydrated(true);
      });
    }
  })
);

export default enhance(App);
