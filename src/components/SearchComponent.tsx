import { ISearchProp } from '../types';
import useLS from '../hooks/useLS';

function SearchComponent(props: ISearchProp) {
  const [query, setQuery] = useLS();
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleSearch() {
    localStorage.setItem('currentSearch', query.toLowerCase());
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
