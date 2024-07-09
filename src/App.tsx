import { useEffect, useState } from 'react';
import Pokelist from './components/Pokelist';
import SearchComponent from './components/SearchComponent';
import { getPokemons } from './api';
import { IAppState, IPokeItem } from './types';
                         
function App () {
  const initial: IAppState = {
  searchValue: '',
  pokemons: null,
  totalPokemons: null,
  errorCreator: false,
  loading: false,
  };
  const [appState, setAppState] = useState(initial)
  
  useEffect(() => {
    async function fetchData() {
      setAppState((prevState) => ({ ...prevState, loading: true }));
      const pokemons: IPokeItem[] = await getPokemons();
      setAppState((prevState) => ({
        searchValue: '',
        errorCreator: prevState.errorCreator,
        loading: false,
        totalPokemons: pokemons,
        pokemons: localStorage.currentSearch
          ? pokemons.filter((pokemon) =>
              pokemon.name.includes(localStorage.currentSearch)
            )
          : pokemons,
      }));
    } 
    fetchData();
  }, []);

  async function handleUpdatePokemons() {
    setAppState((prevState) => ({ ...prevState, loading: true }));
    await getPokemons();
    const searchValue = localStorage.getItem('currentSearch') || '';
    setAppState((prevState: IAppState) => ({
      ...prevState,
      loading: false,
      searchValue,
      pokemons:
        prevState.totalPokemons &&
        (localStorage.getItem('currentSearch') !== ''
          ? prevState.totalPokemons.filter((pokemon) =>
              pokemon.name.includes(searchValue)
            )
          : prevState.totalPokemons),
    }));
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
      <>
        <h1>Class component task</h1>
        <button onClick={handleError} id="errButon">
          Throw an error!
        </button>
        <SearchComponent pokemonsUpdater={handleUpdatePokemons} />
        {appState.loading ? <p>Loading ... -_-</p> : 
        <>{appState.pokemons && <Pokelist items={appState.pokemons} />}</>}
      </>
    );
  }

export default App;
