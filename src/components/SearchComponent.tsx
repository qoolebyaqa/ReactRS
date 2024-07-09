import { useState } from 'react';
import { ISearchProp } from '../types';

function SearchComponent(props: ISearchProp) {
  const [searchValue, setSearchValue] = useState(
    localStorage.currentSearch || ''
  );
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSearch() {
    localStorage.setItem('currentSearch', searchValue.toLowerCase());
    props.pokemonsUpdater();
  }

  return (
    <header>
      <label htmlFor="search"></label>
      <input
        type="text"
        name="search"
        placeholder="Choose your pokemon!"
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSearch}>
        SEARCH
      </button>
    </header>
  );
}

export default SearchComponent;
