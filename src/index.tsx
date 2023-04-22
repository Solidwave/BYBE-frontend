import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AppContainer from './containers/app';
import { createTheme, ThemeProvider } from '@mui/material';

const container = document.getElementById('root')!;
const root = createRoot(container);

const theme = createTheme({
  palette: {
    primary: {
      main: '#511E15',
    },
    secondary: {
      main: '#882013'
    },
    tertiary: {
      main: '#C1A57F',
      dark: '#9F765C'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          letterSpacing: 1
        },
        
      }
    }
  }
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
