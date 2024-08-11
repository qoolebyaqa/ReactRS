'use client'
import { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IURL } from '../types';
import { collectURL } from '../fnHelpers/fnHelpers';
import ErrorBoundary from './ErrorBoundary';


function SearchComponent() {
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [errorInit, setErrorInit] = useState<boolean>(false);
  const search = query.get("search");
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if(search) setSearchValue(String(search))
  }, [search])

  function handleSearch() {
    const updatedURL: IURL = {
      pathname: pathname,
      query: {search: searchValue, page: 1}
    }
    if(query.get('checked')) updatedURL.query.checked = String(query.get('checked'))
    if(query.get('theme')) updatedURL.query.theme = String(query.get('theme'))
    router.push(collectURL(updatedURL));
    router.refresh()
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
