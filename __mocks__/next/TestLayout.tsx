
import '../index.css';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import { IResponse } from '../../types';
import Loading from '../../app/loading';
import SearchComponent from '../../components/SearchComponent';
import Pokelist from '../../components/Pokelist';
import SelectedFlyoutEl from '../../components/SelectedFlyoutEl';

export default function TestLayout({
  children
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const items: IResponse = headersList.get('items') ? JSON.parse(String(headersList.get('items'))) : {results: [{ name: 'bulbasaur', url: 'url1' }, { name: 'ivysaur', url: 'url2' }]}
  const searchParam = headersList.get('search');
  const pageParam = headersList.get('page');
  const checkedParam = headersList.get('checked');
  const themeParam = headersList.get('theme');
  const query = {
    search: String(searchParam),
    page: Number(pageParam),
    checked: String(checkedParam),
    theme: String(themeParam),
  }
  const totalRenderedElems = searchParam ?  items.results.filter(pokemon => pokemon.name.includes(searchParam)) : items.results
  const filtredItems = searchParam && pageParam ? 
  items.results.filter(pokemon => pokemon.name.includes(searchParam)).slice((Number(pageParam) - 1) * 10, 10 * Number(pageParam)) :
  searchParam ?  items.results.filter(pokemon => pokemon.name.includes(searchParam)).slice(0, 10) :
  pageParam ? items.results.slice((Number(pageParam) - 1) * 10, 10 * Number(pageParam)) :
  items.results.slice(0, 10);
  return (
    <div>
    <div>
    <div>
      <Suspense fallback={<Loading />}>
      <header className={`${themeParam === 'dark' ? 'dark' : ''}`}>
        <h1 style={{ padding: '10px' }}>Migration to NextJS</h1>
        <SearchComponent />
      </header>
      <div
        style={{
          color: themeParam === 'dark' ? 'black' : "#11e51f",
          background: themeParam === 'dark' ?  "#c9f9f9" : 'white',
          height: '100vh'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '100px',
            alignItems: 'center',
          }}>
        <Pokelist items={filtredItems} totalLength={totalRenderedElems.length} />
        {children}
        </div>
      {checkedParam && <SelectedFlyoutEl allItems={items.results} searchParams={query}/>}
      </div>
      </Suspense>
    </div>
    </div>
  </div>
  );
}

