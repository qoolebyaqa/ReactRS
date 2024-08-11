
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pokeitem from "../components/Pokeitem";
import SpecialLayout from '../components/SpecialLayout';
import SelectedFlyoutEl from '../components/SelectedFlyoutEl';
import DescriptionCard from '../pages/[name]';
import SearchComponent from '../components/SearchComponent';

const item = { name: 'bulbasaur', url: 'url1' };
const items = [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }];
const query = {page: '2', theme: 'dark'}


jest.mock('next/router', () => jest.requireActual('next-router-mock'));


describe('Pokeitem clicks', () => {
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
describe('Pagination next clicks', () => {
  it('should go to the next page', async () => {
    render(<SpecialLayout items={new Array(100).fill(item).map((val, index) => ({...val, url: val.url + index}))} query={query}><p>Some children</p></SpecialLayout>);
    const button = screen.getByText('↪');
    fireEvent.click(button);
    expect(window.location.href.includes('page=3'))
  });
});
describe('Pagination prev clicks', () => {
  it('should go to the prev page', async () => {
    render(<SpecialLayout items={new Array(100).fill(item).map((val, index) => ({...val, url: val.url + index}))} query={query}><p>Some children</p></SpecialLayout>);
    const button = screen.getByText('↩');
    fireEvent.click(button);
    expect(window.location.href.includes('page=1'))
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
  it('action in url after close card button', () => {
    render(<SpecialLayout items={items} query={{...query, page: '1'}}><p>Some children</p></SpecialLayout>)    
    render(<DescriptionCard name={items[0].name} pokemons={items} query={query}/>)
    expect(window.location.href.includes(items[0].name));    
    const btn = screen.getByText('Close the Description');      
    fireEvent.click(btn);  
    expect(!window.location.href.includes(items[0].name)); 
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
});