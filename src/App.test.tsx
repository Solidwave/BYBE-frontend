import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppContainer from './containers/AppContainer';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
