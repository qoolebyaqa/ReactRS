import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProvider } from "../test/mocks/server";
import Pokelist from "../components/Pokelist";
import MainComponent from "../components/MainComponent";
import Pokeitem from "../components/Pokeitem";
import ErrorPage from "../pages/ErrorPage";
import DescriptionCard from "../components/DescriptionCard";
import SelectedFlyoutEl from "../components/SelectedFlyoutEl";


const item = { name: 'bulbasaur', url: 'url1' };
const items = [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }];


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
