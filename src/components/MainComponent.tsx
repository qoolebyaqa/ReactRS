import { useCallback, useEffect } from 'react';
import Pokelist from './Pokelist';
import SearchComponent from './SearchComponent';
import { getPokemons } from '../api';
import { GlobalStateType, IPokeItem } from '../types';
import Pagination from './Pagination';
import {  useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SwitchComponent from './SwitchComponent';
import SelectedFlyoutEl from './SelectedFlyoutEl';
import { pokeActions } from '../store/PokeSlice';
import { pageActions } from '../store/PageSlice';

function MainComponent() {
  const loadIndicator = useSelector((state: GlobalStateType) => state.PokeStore.loading)
  const errorCreator = useSelector((state: GlobalStateType) => state.PokeStore.errorCreator)
  const items = useSelector((state: GlobalStateType) => state.PokeStore.items)
  const currentPage = useSelector((state: GlobalStateType) => state.PageStore.currentPage)
  const selectedItems = useSelector((state: GlobalStateType) => state.PokeStore.selectedItems);
  
  const dispatch = useDispatch();
  const [searchParams, setSearchParms] = useSearchParams();

  const searchQuery = searchParams.get("page") || 1
  if (Number(searchQuery) > 15 || !Number(searchQuery)) {
    throw new Error('The page is not exist')
  }


  const fetchData = useCallback(async() => {
    dispatch(pokeActions.setLoading(true));
    const pokemonsFromAPI: IPokeItem[] = await getPokemons();
    dispatch(pokeActions.setItems(pokemonsFromAPI));
    dispatch(pokeActions.setLoading(false));
  }, [dispatch]);

  useEffect(() => {    
    fetchData();
  }, [currentPage, fetchData]);

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
      <h1 style={{margin: '10px'}}>Hooks and routing</h1>
      <SwitchComponent selectedDefaultTitle='Light' unselectedTitle='Dark' inputName='Toggle theme' selectedStyles='selected' unselectedStyles='unselected'/>
      <button onClick={handleError} id="errButon">
        Throw an error!
      </button>
      <SearchComponent pokemonsUpdater={currentPage === 1 ? fetchData : updateData } />
      {loadIndicator ? (
        <p>Loading ... -_-</p>
      ) : (
        <>
          {items.pokemons && <Pokelist items={items.pokemons} />}
          {items.pokemonsQuery?.length !== 0 && 
          <Pagination onNext={handleNextPage} onPrev={handlePrevPage} currentPage={currentPage} totalLength={items.pokemonsQuery ? items.pokemonsQuery.length : 0}/>}
        </>
      )}
      {selectedItems.length > 0 && <SelectedFlyoutEl />}
    </div>
  );
}

export default MainComponent;
