import { MemoryRouter } from "react-router";
import Pokelist from "../components/Pokelist";
import { render, screen } from '@testing-library/react'

describe('Pokelist component', () => {
  it('renders the correct number of items', () => {
    const items = [{ name: 'Item 1', url: 'url1' }, { name: 'Item 2', url: 'url2' }];
    render(<MemoryRouter><Pokelist items={items} /></MemoryRouter>);
    const itemElements = screen.getAllByTestId('pokelist-item');
    expect(itemElements).toHaveLength(items.length);
  });

  it('displays a message when no items are present', () => {
    render(<MemoryRouter><Pokelist items={[]} /></MemoryRouter>);
    const messageElement = screen.getByText(/no items available/i);
    expect(messageElement).toBeInTheDocument();
  });
});