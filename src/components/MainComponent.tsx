import { useCallback, useEffect, useState } from 'react';
import Pokelist from './Pokelist';
import SearchComponent from './SearchComponent';
import { getPokemons } from '../api';
import { IAppState, IPokeItem } from '../types';
import Pagination from './Pagination';
import {  useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParms] = useSearchParams();

  const searchQuery = searchParams.get("page") || 1
  if (Number(searchQuery) > 15 || !Number(searchQuery)) {
    throw new Error('The page is not exist')
  }

  const fetchData = useCallback(async() => {
    setAppState((prevState) => ({ ...prevState, loading: true }));
    const pokemonsFromAPI: IPokeItem[] = await getPokemons();
    const pokemonsUnderQuery: IPokeItem[] = localStorage.currentSearch
    ? pokemonsFromAPI.filter((pokemon) =>
        pokemon.name.includes(localStorage.currentSearch)
      )
    : pokemonsFromAPI
    setAppState((prevState) => ({
      ...prevState,
      currentPage: Number(searchQuery),
      pokemonsQuery: [...pokemonsUnderQuery],
      errorCreator: prevState.errorCreator,
      loading: false,
      totalPokemons: pokemonsFromAPI,
      pokemons: pokemonsUnderQuery.slice((prevState.currentPage-1) * 10, prevState.currentPage*10),
    }));
  }, [searchQuery]);
  useEffect(() => {    
    fetchData();
  }, [appState.currentPage, fetchData]);

  async function handleNextPage() {
    setAppState((prevState) => ({...prevState, currentPage: prevState.currentPage++}))
    setSearchParms({page: (appState.currentPage+1).toString()})
  }
  async function handlePrevPage() {
    setAppState((prevState) => ({...prevState, currentPage: prevState.currentPage--}))
    setSearchParms({page: (appState.currentPage-1).toString()})
  }
  function updateData() {
    setSearchParms({page: '1'});
    setAppState((prev) => ({...prev, currentPage: 1}))
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
      <SearchComponent pokemonsUpdater={appState.currentPage === 1 ? fetchData : updateData } />
      {appState.loading ? (
        <p>Loading ... -_-</p>
      ) : (
        <>
          {appState.pokemons && <Pokelist items={appState.pokemons} />}
          {appState.pokemonsQuery?.length !== 0 && <Pagination onNext={handleNextPage} onPrev={handlePrevPage} currentPage={appState.currentPage} totalLength={appState.pokemonsQuery ? appState.pokemonsQuery.length : 0}/>}
        </>
      )}
    </div>
  );
}

export default MainComponent;
