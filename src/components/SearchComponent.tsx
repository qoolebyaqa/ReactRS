
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SwitchComponent from './SwitchComponent';
import ErrorBoundary from './ErrorBoundary';

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
  const [errorInit, setErrorInit] = useState<boolean>(false);
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
  if (errorInit) {
    return <ErrorBoundary><h2>You initiated this error, please reload the page to continue</h2></ErrorBoundary>
  }

  return (
    <>
      <SwitchComponent inputName='Theme changer' selectedDefaultTitle='Dark' unselectedTitle='Light' selectedStyles='selected' unselectedStyles='unselected'/>
      <div style={{display: 'flex', justifyContent: 'center', gap: '40px', paddingBottom: '30px', paddingTop: '20px'}}>
      <button onClick={() => {
          setErrorInit(true)}
        }  style={{backgroundColor: 'red'}}>Throw Error</button>
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
      </div>
    </>
  );
}

export default SearchComponent;
