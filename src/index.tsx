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
      dark: '#9F765C',
      light:'#C09F6D'
    }
  },
  gradient: {
    main: 'radial-gradient(50% 50% at 50% 50%, #E2BE87 0%, #AA8B5B 100%)',
    secondary: 'radial-gradient(115.4% 115.4% at 50% 50%, #D6B37E 0%, #A48558 100%)'
  },
  extraShadows: {
    panel: '0px 0px 10px #000000, inset 0px 0px 4px #000000',
    card: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)'
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
