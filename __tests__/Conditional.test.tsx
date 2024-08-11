
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Pokeitem from '../components/Pokeitem';
import SearchComponent from '../components/SearchComponent';
import { getPokemonData } from '../fnHelpers/serverHelpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TestLayout from '../__mocks__/next/TestLayout';
import RootLayout from '../app/layout';
import Pagination from '../components/Pagination';
import Pokelist from '../components/Pokelist';

const item = { name: 'bulbasaur', url: 'url1' };
const items = [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }];
const query = {page: '2', theme: 'dark'}



jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../components/Pagination', () => ({
  __esModule: true,
  default: () => <div>Pagination Component</div>
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: () => ({
    get: jest.fn((key: string) => {
      switch (key) {
        case 'search':
          return ''; 
        case 'page':
          return '1';
        case 'checked':
          return '[]';
        case 'theme':
          return 'dark';
        default:
          return null;
      }
    })
  }),
}));
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

jest.mock('../fnHelpers/fnHelpers', () => ({
  collectURL: jest.fn((url) => `mocked-url?${new URLSearchParams(url.query).toString()}`),  
  })
)
jest.mock('../fnHelpers/fnHelpers', () => ({
  ...jest.requireActual('../fnHelpers/fnHelpers'),
  convertToCSV: jest.fn(() => 'mocked-csv-data'), 
}));
jest.mock('../fnHelpers/serverHelpers', () => ({
  getPokemonData: jest.fn()
}));


jest.mock('next/headers', () => ({
  headers: () => ({
    get: jest.fn((key: string) => {
      switch (key) {
        case 'search':
          return ''; 
        case 'page':
          return '1';
        case 'checked':
          return '[]';
        case 'theme':
          return 'dark';
        default:
          return null;
      }
    })
  })
}));

const mockPokemonData = {
  name: 'bulbasaur',
  url: 'url1'
};
(getPokemonData as jest.Mock).mockResolvedValue(mockPokemonData);


describe('RootLayout', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = jest.fn(); 
  });
  it('renders with mocked data', async () => {
    await act(async () => {
      render(
        <RootLayout>
          <div>Child Component</div>
        </RootLayout>
      );
      render(<Pagination totalLength={100}/>)
    });

    expect(screen.getByText('Migration to NextJS')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByText('Pokemons are here')).toBeInTheDocument();
  });
}); 


describe('Pokeitem clicks', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock);
  });
  it('should navigate to the correct URL when button is clicked', () => {
    render(<Pokeitem item={item} allItems={[item]} />);
    const button = screen.getByText('bulbasaur');
    fireEvent.click(button);
    expect(location.href.includes('bulbasaur'));
  });
});
describe('clicks handlers', () => {
  it('should add checked to url', async () => {
    render(<Pokeitem item={item} allItems={items}/>);
    const checkbox = screen.getByRole(`checkbox`);    
    fireEvent.click(checkbox);
    expect(window.location.search.includes('checked'));        
    fireEvent.click(checkbox);
    expect(!window.location.search.includes('checked')); 
  });
  it('error boundary after click', async () => {
    render(<SearchComponent/>)       
    const errorButton = screen.getByText("Throw an error");
    expect(errorButton).toBeInTheDocument();
    expect(() => {
      fireEvent.click(errorButton)
      expect(screen.getByText('You initiate this error, please reload the page to continue')).toBeInTheDocument()
    });
  })
  
})
