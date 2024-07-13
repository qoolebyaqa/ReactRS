import { useEffect, useState } from 'react';
import Pokelist from './Pokelist';
import SearchComponent from './SearchComponent';
import { getPokemons } from '../api';
import { IAppState, IPokeItem } from '../types';
import Pagination from './Pagination';

function MainComponent() {
  const initial: IAppState = {
    searchValue: '',
    pokemons: null,
    pokemonsQuery: null,
    totalPokemons: null,
    errorCreator: false,
    loading: false,
    currentPage: 1,
  };

  const [appState, setAppState] = useState(initial);
  async function fetchData() {
    setAppState((prevState) => ({ ...prevState, loading: true }));
    const pokemonsFromAPI: IPokeItem[] = await getPokemons();
    const pokemonsUnderQuery: IPokeItem[] = localStorage.currentSearch
    ? pokemonsFromAPI.filter((pokemon) =>
        pokemon.name.includes(localStorage.currentSearch)
      )
    : pokemonsFromAPI
    setAppState((prevState) => ({
      ...prevState,
      pokemonsQuery: [...pokemonsUnderQuery],
      errorCreator: prevState.errorCreator,
      loading: false,
      totalPokemons: pokemonsFromAPI,
      pokemons: pokemonsUnderQuery.slice((prevState.currentPage-1) * 10, prevState.currentPage*10),
    }));
  }

  useEffect(() => {    
    fetchData();
  }, [appState.currentPage]);

  /* async function handleUpdatePokemons() {
    setAppState((prevState) => ({ ...prevState, loading: true }));
    const pokemonsFromAPI: IPokeItem[] = await getPokemons();
    const searchValue = localStorage.getItem('currentSearch') || '';
    setAppState((prevState: IAppState) => ({
      ...prevState,
      currentPage: 1,
      loading: false,
      pokemons:
      pokemonsFromAPI &&
        (localStorage.getItem('currentSearch') !== ''
          ? pokemonsFromAPI.filter((pokemon) =>
              pokemon.name.includes(searchValue)
            )
          : prevState.totalPokemons),
    }));
  } */
  async function handleNextPage() {
    setAppState((prevState) => ({...prevState, currentPage: prevState.currentPage++}))
  }
  async function handlePrevPage() {
    setAppState((prevState) => ({...prevState, currentPage: prevState.currentPage--}))
  }
  function handleError() {
    setAppState((prevState) => ({
      ...prevState,
      errorCreator: true,
    }));
  }
  if (appState.errorCreator) {
    throw new Error('User initiates this error');
  }
  return (
    <div>
      <h1>Hooks and routing</h1>
      <button onClick={handleError} id="errButon">
        Throw an error!
      </button>
      <SearchComponent pokemonsUpdater={appState.currentPage === 1 ? fetchData : () => (setAppState((prev) => ({...prev, currentPage: 1})))} />
      {appState.loading ? (
        <p>Loading ... -_-</p>
      ) : (
        <>
          {appState.pokemons && <Pokelist items={appState.pokemons} />}
          <Pagination onNext={handleNextPage} onPrev={handlePrevPage} currentPage={appState.currentPage} totalLength={appState.pokemonsQuery ? appState.pokemonsQuery.length : 0}/>
        </>
      )}
    </div>
  );
}

export default MainComponent;
