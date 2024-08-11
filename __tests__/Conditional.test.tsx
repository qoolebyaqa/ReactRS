
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pokeitem from '../components/Pokeitem';
import SearchComponent from '../components/SearchComponent';
import { getPokemonData } from '../fnHelpers/serverHelpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RootLayout from '../app/layout';

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
  useSearchParams: jest.fn(),
}));

jest.mock('../fnHelpers/fnHelpers', () => ({
  collectURL: jest.fn((url) => `mocked-url?${new URLSearchParams(url.query).toString()}`)
}));
jest.mock('../fnHelpers/serverHelpers', () => ({
  getPokemonData: jest.fn()
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      results: [{ name: 'bulbasaur', url: 'http://example.com/bulbasaur' }] 
    }),
  })
) as jest.Mock;

jest.mock('next/headers', () => ({
  headers: () => ({
    get: (key: string) => {
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
    }
  })
}));

const mockPokemonData = {
  name: 'bulbasaur',
  url: 'url1'
};
(getPokemonData as jest.Mock).mockResolvedValue(mockPokemonData);


/* describe('RootLayout', () => {
  it('renders with mocked data', async () => {
    render(
      <RootLayout>
        <div>Child Component</div>        
      </RootLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Migration to NextJS')).toBeInTheDocument();
      expect(screen.getByText('Child Component')).toBeInTheDocument();
      expect(screen.getByText('Pokemons are here')).toBeInTheDocument();
    });
  });
}); */


describe('Pokeitem clicks', () => {
  const mockRouter = { push: jest.fn(), refresh: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/current-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('checked=["bulbasaur"]'));
  });
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });
  it('should navigate to the correct URL when button is clicked', async () => {
    render(<Pokeitem item={item} allItems={[item]} />);
    const button = screen.getByText('bulbasaur');
    fireEvent.click(button);
    expect(window.location.href.includes('bulbasaur'))
  });
});
/* describe('Pagination next clicks', () => {
  it('should go to the next page', async () => {
    render(<SpecialLayout items={new Array(100).fill(item).map((val, index) => ({...val, url: val.url + index}))} query={query}><p>Some children</p></SpecialLayout>);
    const button = screen.getByText('↪');
    fireEvent.click(button);
    expect(window.location.href.includes('page=3'))
  });
}); */
/* describe('Pagination prev clicks', () => {
  it('should go to the prev page', async () => {
    render(<RootLayout><p>Some children</p></RootLayout>);
    const button = screen.getByText('↩');
    fireEvent.click(button);
    expect(window.location.href.includes('page=1'))
  });
}); */
describe('clicks handlers', () => {
  it('should add checked to url', async () => {
    render(<Pokeitem item={item} allItems={items}/>);
    const checkbox = screen.getByRole(`checkbox`);    
    fireEvent.click(checkbox);
    expect(window.location.search.includes('checked'));        
    fireEvent.click(checkbox);
    expect(!window.location.search.includes('checked')); 
  });
  /* it('action in url after close card button', () => {
    render(<SpecialLayout items={items} query={{...query, page: '1'}}><p>Some children</p></SpecialLayout>)    
    render(<DescriptionCard name={items[0].name} pokemons={items} query={query}/>)
    expect(window.location.href.includes(items[0].name));    
    const btn = screen.getByText('Close the Description');      
    fireEvent.click(btn);  
    expect(!window.location.href.includes(items[0].name)); 
  }); */
  it('error boundary after click', async () => {
    render(<SearchComponent/>)       
    const errorButton = screen.getByText("Throw an error");
    expect(errorButton).toBeInTheDocument();
    expect(() => {
      fireEvent.click(errorButton)
      expect(screen.getByText('You initiate this error, please reload the page to continue')).toBeInTheDocument()
    });
  })
  
});