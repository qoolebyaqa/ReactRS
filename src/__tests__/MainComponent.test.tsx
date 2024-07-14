import { MemoryRouter } from "react-router";
import MainComponent from "../components/MainComponent";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchComponent from "../components/SearchComponent";

describe('MainComponent', () => {
  test('clicking on Throw error button activates ErrorBoundary', async () => {
    render(
      <MemoryRouter>
        <MainComponent />
      </MemoryRouter>
    );    
    const errorButton = screen.getByText("Throw an error!");
    expect(errorButton).toBeInTheDocument();
    expect(() => fireEvent.click(errorButton)).toThrowError('User initiates this error');

  });
});

describe('MainComponent', () => {
  test('Saving searchquery to local storage', async () => {
    const mockPokemonsUpdater = vi.fn();
    render(
      <MemoryRouter>
        <SearchComponent pokemonsUpdater={mockPokemonsUpdater} />
      </MemoryRouter>
    );    
    const searchButton = screen.getByText('SEARCH');
    const searchInput = screen.getByPlaceholderText('Choose your pokemon!');
    fireEvent.change(searchInput, { target: { value: 'test value' } });
    fireEvent.click(searchButton);
    expect(mockPokemonsUpdater).toHaveBeenCalled();
    expect(localStorage.getItem("currentSearch")).toBe('test value');
  });
});
