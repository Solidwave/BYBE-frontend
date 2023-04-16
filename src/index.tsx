import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AppContainer from './containers/app';

const container = document.getElementById('root')!;
const root = createRoot(container);


declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    brown?: {
      main?: string,
      secondary?: string
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#CCC'
    },
    brown: {
      main: '#C1A57F'
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
