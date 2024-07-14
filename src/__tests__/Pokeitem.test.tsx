import { MemoryRouter } from "react-router";
import Pokeitem from "../components/Pokeitem";
import { fireEvent, render, screen } from '@testing-library/react'
import DescriptionCard from "../components/DescriptionCard";
import { getPokemons } from "../api";

const item = { name: 'Pokemon', url: 'url1' }

describe('Pokeitem component', () => {
  test('renders the relevant card data', () => {
    render(<MemoryRouter><Pokeitem item={item} /></MemoryRouter>);
    const titleElement = screen.getByText(item.name);
    expect(titleElement).toBeInTheDocument();
  });
});

describe('Pokeitem component', () => {
  const detailedCardTitle = 'Pokedeks description';
  test('clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter>
        <Pokeitem item={item} />
        <DescriptionCard />
      </MemoryRouter>
    );
    
    const cardElement = screen.getByText(item.name);
    fireEvent.click(cardElement);
    const detailedCardElement = await screen.findByText(detailedCardTitle);
    expect(detailedCardElement).toBeInTheDocument();
  });
});


describe('Pokeitem component', () => {

  test('click triggers an additional API call to fetch detailed information', async () => {
    render(<MemoryRouter><Pokeitem item={item} /></MemoryRouter>);
    
    const cardElement = screen.getByText(item.name);
    fireEvent.click(cardElement);

    expect(getPokemons).toHaveBeenCalledOnce;
  });
});