import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/scss/index.scss";
import Routes from './routes';
import { Provider } from "react-redux";
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import colors from './assets/scss/_colors.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
  },
  overrides: {
    MuiTabs: {
      root: {
        color: colors.secondary,
      },
      indicator: {
        backgroundColor: colors.primary,
        height: 4,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
      flexContainer: {
        paddingLeft: 24,
      }
    },
    MuiTab: {
      root: {
        height: 60,
      }
    }
  }
});



const store = configureStore();

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Routes />
      </I18nextProvider>
    </Provider>
  </ThemeProvider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
