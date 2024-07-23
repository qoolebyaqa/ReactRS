import { ISearchProp } from '../types';
import useLS from '../hooks/useLS';
import { useDispatch } from 'react-redux';
import { pokeActions } from '../store/PokeSlice';

function SearchComponent(props: ISearchProp) {
  const [query, setQueryLS] = useLS('currentSearch', '');
  const dispatch = useDispatch();
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQueryLS(event.target.value);
  }

  function handleSearch() {
    localStorage.setItem('currentSearch', query.toLowerCase());
    dispatch(pokeActions.setSearchVal(query.toLowerCase()))
    props.pokemonsUpdater();
  }

  return (
    <section>
      <label htmlFor="search"></label>
      <input
        type="text"
        name="search"
        placeholder="Choose your pokemon!"
        value={query}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSearch}>
        SEARCH
      </button>
    </section>
  );
}

export default SearchComponent;
