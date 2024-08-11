import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Loading from '../app/loading';
import Pokelist from '../components/Pokelist';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pokeitem from '../components/Pokeitem';
import DescriptionCard from '../app/[name]/page';
import { getPokemonData } from '../fnHelpers/serverHelpers';
import ErrorPage from '../app/not-found';
import ErrorBoundary from '../components/ErrorBoundary';

const item = { name: 'bulbasaur', url: 'url1' };
const items = [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }];
const query = {search: 'char', page: 1, theme: 'dark'}


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

const mockPokemonData = {
  name: 'bulbasaur',
  url: 'url1'
};
(getPokemonData as jest.Mock).mockResolvedValue(mockPokemonData);


describe('Pages render', () => {
  const mockRouter = { push: jest.fn(), refresh: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/current-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('checked=["bulbasaur"]'));
  });
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });
  it('renders Pokeitem and handles checkbox change', () => {
    const item = { name: 'bulbasaur', url: 'url1' };
    const allItems = [item];

    render(<Pokeitem item={item} allItems={allItems} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });

    expect(location.search.includes('bulbasaur'));
  });

  it('renders Pokeitem and handles button click', () => {
    const item = { name: 'bulbasaur', url: 'url1' };
    const allItems = [item];

    render(<Pokeitem item={item} allItems={allItems} />);

    const button = screen.getByText(item.name);
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith('mocked-url?checked=%5B%22bulbasaur%22%5D');
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
  it('renders Pokelist with items', () => {
    render(<Pokelist items={items} totalLength={items.length} />);

    expect(screen.getByText('Pokemons are here')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('Pagination Component')).toBeInTheDocument();
  });

  it('renders message when no items are available', () => {
    render(<Pokelist items={[]} totalLength={0} />);
    expect(screen.getByText('no items available')).toBeInTheDocument();
  });
  it('renders a main page', () => {
    render(<Loading />) 
    const pageText = screen.getByText('Loading... -_-'); 
    expect(pageText).toBeInTheDocument();
  })  
  it('renders empty page', () => {
    render(<Pokelist items={[]} totalLength={0}/>)
    expect(screen.getByText(/no items available/i)).toBeInTheDocument();
  })  
  it('renders no elements text', () => {
    render(<Pokelist items={items} totalLength={2}/>)
    const elements = screen.getAllByTestId('poke-item')    
    expect(elements).toHaveLength(items.length);
  })
  it('renders error page', () => {
    render(<ErrorPage/>)
    const text = screen.getByText('Oh... it is 404!')    
    expect(text).toBeInTheDocument();
  })
  it('renders error boundary', () => {
    render(<ErrorBoundary><p>Sometext</p></ErrorBoundary>)
    const text = screen.getByText('Sometext')    
    expect(text).toBeInTheDocument();
  })
});
