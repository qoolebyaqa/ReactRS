
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import MainComponent from '../components/MainComponent';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('MainComponent', () => {
  it('should update search query in URL on next page', async () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>,
      { route: '/?page=1' }
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const nextButton = screen.getByText('↪');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(window.location.search).toBe('?page=1');
    });
  });

  it('should update search query in URL on previous page', async () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>,
      { route: '/?page=2' }
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const prevButton = screen.getByText('↩');
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(window.location.search).toBe('?page=2');
    });
  });
});