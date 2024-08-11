
import '../index.css';
import Pokelist from '../components/Pokelist';
import SearchComponent from '../components/SearchComponent';
import { IResponse } from '../types';
import { headers } from 'next/headers';
import SelectedFlyoutEl from '../components/SelectedFlyoutEl';
import { Suspense } from 'react';
import Loading from './loading';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const items: IResponse = await res.json();
  const headersList = headers();
  
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
    <html>
    <body>
    <main>
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
    </main>
    </body>
  </html>
  );
}
