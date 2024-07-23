import Pokelist from './Pokelist';
import SearchComponent from './SearchComponent';
import { GlobalStateType, IPokeItem } from '../types';
import Pagination from './Pagination';
import {  useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SwitchComponent from './SwitchComponent';
import SelectedFlyoutEl from './SelectedFlyoutEl';
import { pokeActions } from '../store/PokeSlice';
import { pageActions } from '../store/PageSlice';
import apiSlice from '../store/ApiSlice';
import { useEffect, useMemo } from 'react';

function MainComponent() {
  const currentPage = useSelector((state: GlobalStateType) => state.PageStore.currentPage)
  const { data: pokemonsFromApi, isSuccess, isFetching } = apiSlice.useGetTotalPokemonsQuery(150);
  const searchValue = useSelector((state: GlobalStateType) => state.PokeStore.searchValue)
  const errorCreator = useSelector((state: GlobalStateType) => state.PokeStore.errorCreator)
  const selectedItems = useSelector((state: GlobalStateType) => state.PokeStore.selectedItems);
  
  const dispatch = useDispatch();
  const [searchParams, setSearchParms] = useSearchParams();


  const searchQuery = searchParams.get("page") || 1
  if (Number(searchQuery) > 15 || !Number(searchQuery)) {
    throw new Error('The page is not exist')
  }
  useEffect(() => {
    if(localStorage.currentSearch) {
      dispatch(pokeActions.setSearchVal(localStorage.currentSearch))
    }
    dispatch(pageActions.setPage(Number(searchQuery))); 
  }, [searchQuery, dispatch])

  const items = useMemo(() => {
    if(isSuccess && pokemonsFromApi) {     
      const pokemonsUnderQuery = localStorage.currentSearch ? 
      pokemonsFromApi?.filter((pokemon: IPokeItem) => pokemon.name.includes(localStorage.currentSearch)) : 
      pokemonsFromApi;
      const itemsState = {
        totalPokemons: pokemonsFromApi,
        pokemonsQuery: pokemonsUnderQuery,
        pokemons: pokemonsUnderQuery.slice((currentPage - 1) * 10, currentPage*10)
      }
      return itemsState
    }      
  }, [isSuccess, pokemonsFromApi, currentPage, searchValue])


  async function handleNextPage() {
    dispatch(pageActions.changePage('next'))
    setSearchParms({page: (currentPage+1).toString()})
  }
  async function handlePrevPage() {
    dispatch(pageActions.changePage('prev'))
    setSearchParms({page: (currentPage-1).toString()})
  }
  function updateData() {
    setSearchParms({page: '1'});
    dispatch(pageActions.changePage('restore'))
  }
  function handleError() {
    dispatch(pokeActions.setError(true));
  }
  if (errorCreator) {
    throw new Error('User initiates this error');
  }
  return (
    <div>
      <h1 style={{margin: '10px'}}>App state management</h1>
      <SwitchComponent selectedDefaultTitle='Light' unselectedTitle='Dark' inputName='Toggle theme' selectedStyles='selected' unselectedStyles='unselected'/>
      <button onClick={handleError} id="errButon">
        Throw an error!
      </button>
      <SearchComponent pokemonsUpdater={updateData } />
      {isFetching ? (
        <p>Loading ... -_-</p>
      ) : (
        <>
          {items?.pokemons && <Pokelist items={items?.pokemons} />}
          {items?.pokemonsQuery?.length !== 0 && 
          <Pagination onNext={handleNextPage} onPrev={handlePrevPage} currentPage={currentPage} totalLength={items?.pokemonsQuery ? items?.pokemonsQuery?.length : 0}/>}
        </>
      )}
      {selectedItems.length > 0 && <SelectedFlyoutEl />}
    </div>
  );
}

export default MainComponent;
