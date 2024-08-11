import CloseDescriptionBtn from "../components/CloseDescriptionBtn";
import Pokelist from "../components/Pokelist";
import SelectedFlyoutEl from "../components/SelectedFlyoutEl";
import PokemonsPage from "../pages";
import { render, screen, fireEvent } from '@testing-library/react';
import DescriptionCard from "../pages/[name]";

const item = { name: 'bulbasaur', url: 'url1' };
const items = [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }];
const query = {search: 'char', page: '1', theme: 'dark'}


jest.mock('next/router', () => jest.requireActual('next-router-mock'));


describe('Pages render', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });
  it('renders a main page', () => {
    render(<PokemonsPage data={items} query={query} />) 
    const pageText = screen.getByText('Get info about pokemon'); 
    expect(pageText).toBeInTheDocument();
  })
  it('renders a main page', () => {
    render(<PokemonsPage data={items} query={query} />) 
    const layoutText = screen.getByText('Migration to NextJS');
    expect(layoutText).toBeInTheDocument()
  })
  it('renders with correct query', () => {
    render(<PokemonsPage data={items} query={query} />) 
    expect(window.location.search.includes('theme=dark'))    
    expect(window.location.search.includes('search=char'))    
    expect(window.location.search.includes('page=1'))
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
  it('renders close card button', () => {
    render(<CloseDescriptionBtn/>)
    const btn = screen.getByText('Close the Description');    
    expect(btn).toBeInTheDocument(); 
  })
});
describe('Pages render', () => {
  it('404 for wrong path', () => {
    render(<DescriptionCard name={'error'} pokemons={items} query={query}/>)
    expect(screen.getByText('Oh... it is 404!')).toBeInTheDocument(); 
  })
})