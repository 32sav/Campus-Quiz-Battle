import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

test('renders Campus Quiz Battle branding on initial load', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const brandElements = screen.getAllByText(/Campus Quiz Battle/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
