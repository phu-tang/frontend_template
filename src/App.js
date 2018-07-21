import { Provider } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import Layout from './components/layout';
import THEME_CONFIG from './config/theme.json';

const theme = createMuiTheme({
  appBar: {
    color: THEME_CONFIG.colors.bar
  },
  palette: {
    primary: { main: THEME_CONFIG.colors.primary },
    secondary: { main: THEME_CONFIG.colors.secondary }
  }
});

type AppPropsType = {
  store: any,
  rehydrated: boolean
};

const App = ({ store, rehydrated }: AppPropsType) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
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
