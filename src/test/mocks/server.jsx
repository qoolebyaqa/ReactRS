import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import MainComponent from '../../components/MainComponent';
import { render } from '@testing-library/react';
import store from '../../store';
 
export const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export const renderWithProvider = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </Provider>
  );
};