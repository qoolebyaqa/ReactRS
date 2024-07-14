import { render, screen } from '@testing-library/react'
import MainPage from "../pages/MainPage";
import { MemoryRouter } from 'react-router';
import ErrorPage from '../pages/ErrorPage';

describe('One statement check', () => {
  it('renders page', () => {
    render(<MemoryRouter><MainPage/></MemoryRouter>);
    const title = screen.getByText('Hooks and routing');
    expect(title).toBeInTheDocument();
  });
});

describe('One statement check', () => {
  it('Error Page', () => {
    render(<MemoryRouter><ErrorPage/></MemoryRouter>);
    const title = screen.getByText('Oh... it is 404!');
    expect(title).toBeInTheDocument();
  });
});