import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderWithProvider } from "../test/mocks/server";
import Pokelist from "../components/Pokelist";
import MainComponent from "../components/MainComponent";
import Pokeitem from "../components/Pokeitem";
import ErrorPage from "../pages/ErrorPage";
import DescriptionCard from "../components/DescriptionCard";
import SelectedFlyoutEl from "../components/SelectedFlyoutEl";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "../store";
import App from "../../some/App";
import { convertToCSV } from "../fnHelpers/fnHelpers";
import { IAppState, IPokeItem } from "../types";
import ErrorBoundary from "../components/ErrorBoundary";
import PokeSlice, { pokeActions } from "../store/PokeSlice";


const item = { name: 'bulbasaur', url: 'url1' };
const items = [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }];
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'mockedBlobURL');
});

describe('Pokelist component', () => {
  it('renders the correct number of items', () => {
    
    renderWithProvider(<Pokelist items={items} />);
    const itemElements = screen.getAllByTestId('pokelist-item');
    expect(itemElements).toHaveLength(items.length);
  });

  it('check exact item on page', () => {
    renderWithProvider(<Pokelist items={items} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  })

  it('displays a message when no items are present', () => {
    renderWithProvider(<Pokelist items={[]} />);
    const messageElement = screen.getByText(/no items available/i);
    expect(messageElement).toBeInTheDocument();
  });
});


describe('MainComponent', () => {
  it('renders the main component and displays data from the API', async () => {    

    renderWithProvider(<MainComponent/>)
    expect(await screen.findByText('Pokemons are here')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur1')).toBeInTheDocument();
  })
})


describe('Pokeitem component', () => {  
  test('renders the relevant card data', () => {
    renderWithProvider(<Pokeitem item={item} />);
    const titleElement = screen.getByText(item.name);
    expect(titleElement).toBeInTheDocument();
  });
});

describe('MainComponent', () => {
  it('should update search query in URL on next page', async () => {
    renderWithProvider(<MainComponent />, { route: '/?page=1' });
    await waitFor(() => {
      expect(screen.getByText('bulbasaur1')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur9')).toBeInTheDocument();
    });

    const nextButton = screen.queryByText('↪');
    expect(nextButton).toBeInTheDocument();

    if (nextButton) {
      fireEvent.click(nextButton);
      await waitFor(() => {
        expect(screen.getByTestId('test-2')).toBeInTheDocument();
      });
    }
  });
});

describe('One statement check', () => {
  it('Error Page', () => {
    renderWithProvider(<ErrorPage/>);
    const title = screen.getByText('Oh... it is 404!');
    expect(title).toBeInTheDocument();
  });
});

describe('One statement check', () => {
  it('renders page', () => {
    renderWithProvider(<MainComponent/>);
    const title = screen.getByText('App state management');
    expect(title).toBeInTheDocument();
  });
});

describe('One statement check', () => {
  it('renders page', () => {
    renderWithProvider(<DescriptionCard/>);
    const title = screen.getByText('Pokedeks description');
    expect(title).toBeInTheDocument();
  });
});
describe('MainComponent', () => {
  it('render flyout element', async () => {
    renderWithProvider(<MainComponent />);
    await waitFor(() => {
      expect(screen.getByRole('checkboxbulbasaur1')).toBeInTheDocument();
    });

    const selectBtn = screen.getByRole('checkboxbulbasaur1');
    expect(selectBtn).toBeInTheDocument();

    if (selectBtn) {
      fireEvent.input(selectBtn);
      await waitFor(() => {
        renderWithProvider(<SelectedFlyoutEl />);
        expect(screen.getByText('Download')).toBeInTheDocument();
      });
    }
  });
});

describe('Main Application Render', () => {
  it('renders the App component', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    renderWithProvider(<MainComponent />);

    expect(screen.getByText('App state management')).toBeInTheDocument();
  });
});

describe('convertToCSV', () => {
  it('should return an empty string for an empty array', () => {
    const data: IPokeItem[] = [];
    const result = convertToCSV(data);
    expect(result).toBe('');
  });

  it('should convert a single item array to CSV format', () => {
    const data: IPokeItem[] = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
    ];
    const result = convertToCSV(data);
    const expected = 'sequence, name, url\n1, bulbasaur, https://pokeapi.co/api/v2/pokemon/1/\n';
    expect(result).toBe(expected);
  });

  it('should convert multiple items array to CSV format', () => {
    const data: IPokeItem[] = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ];
    const result = convertToCSV(data);
    const expected = 'sequence, name, url\n1, bulbasaur, https://pokeapi.co/api/v2/pokemon/1/\n2, ivysaur, https://pokeapi.co/api/v2/pokemon/2/\n';
    expect(result).toBe(expected);
  });
});
describe('Error Boundary', () => {
  it('shows loading text when navigation state is loading', () => {
    render(<ErrorBoundary><p>You initiate this error, please reload the page to continue</p></ErrorBoundary>)
    expect(screen.getByText('You initiate this error, please reload the page to continue')).toBeInTheDocument();
  })
})

describe('PokeSlice', () => {
  const initialState: IAppState = {
    items: {
      pokemonsQuery: [],
      totalPokemons: null,
      pokemons: null, 
    },
    activeCard: {},        
    searchValue: '',
    errorCreator: false,
    loading: false,
    theme: false,
    selectedItems: [],
    blobUrl: ''
  };

  it('should handle toogleTheme', () => {
    const newState = PokeSlice(initialState, pokeActions.toogleTheme(true));
    expect(newState.theme).toBe(true);
  });

  it('should handle setItems', () => {
    const items = { pokemonsQuery: [], totalPokemons: [], pokemons: [] };
    const newState = PokeSlice(initialState, pokeActions.setItems(items));
    expect(newState.items).toEqual(items);
  });

  it('should handle setLoading', () => {
    const newState = PokeSlice(initialState, pokeActions.setLoading(true));
    expect(newState.loading).toBe(true);
  });

  it('should handle setActiveCard', () => {
    const card = { name: 'Pikachu' };
    const newState = PokeSlice(initialState, pokeActions.setActiveCard(card));
    expect(newState.activeCard).toEqual(card);
  });

  it('should handle setSearchVal', () => {
    const searchValue = 'Pikachu';
    const newState = PokeSlice(initialState, pokeActions.setSearchVal(searchValue));
    expect(newState.searchValue).toBe(searchValue);
  });

  it('should handle setError', () => {
    const newState = PokeSlice(initialState, pokeActions.setError(true));
    expect(newState.errorCreator).toBe(true);
  });
  it('should handle setSelectedItems', () => {
    const item: IPokeItem = { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' };
    const newState = PokeSlice(initialState, pokeActions.setSelectedItems(item));
    expect(newState.selectedItems).toContain(item);
    expect(newState.blobUrl).toBe('mockedBlobURL');

    const newState2 = PokeSlice(newState, pokeActions.setSelectedItems(item));
    expect(newState2.selectedItems).not.toContain(item);
  });

  it('should handle clearSelectedItems', () => {
    const item: IPokeItem = { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' };
    const stateWithSelectedItem = {
      ...initialState,
      selectedItems: [item],
    };
    const newState = PokeSlice(stateWithSelectedItem, pokeActions.clearSelectedItems());
    expect(newState.selectedItems).toEqual([]);
  });

  it('should handle setBlob', () => {
    const item: IPokeItem = { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' };
    const stateWithSelectedItem = {
      ...initialState,
      selectedItems: [item],
    };
    const newState = PokeSlice(stateWithSelectedItem, pokeActions.setBlob());
    expect(newState.blobUrl).toBe('mockedBlobURL');
  });
});