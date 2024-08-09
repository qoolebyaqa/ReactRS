
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SwitchComponent from './SwitchComponent';

interface IURL {
  pathname: string,
  query: {
    search?: string,
    page: number
  }
}

function SearchComponent() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if(router.query.search) setSearchValue(String(router.query.search))
  }, [router.query.search])

  function handleSearch() {
    const updatedURL: IURL = {
      pathname: router.pathname,
      query: {...router.query, search: searchValue, page: 1}
    }
    if (searchValue === '') {
      delete updatedURL.query.search
    }
    router.push(updatedURL);
  }

  return (
    <>
      <SwitchComponent inputName='Theme changer' selectedDefaultTitle='Dark' unselectedTitle='Light' selectedStyles='selected' unselectedStyles='unselected'/>
      <label htmlFor="search"/>
      <input
        type="search"
        name="search"
        placeholder="Choose your pokemon!"
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSearch}>
        SEARCH
      </button>
    </>
  );
}

export default SearchComponent;
