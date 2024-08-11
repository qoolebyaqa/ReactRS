import SearchComponent from './SearchComponent';
import Pokelist from './Pokelist';
import { IPokeItem, Iquery } from '../types';
import SelectedFlyoutEl from './SelectedFlyoutEl';

export default function SpecialLayout({
  children,
  items,
  query,
}: {
  children: React.ReactNode;
  items: IPokeItem[];
  query?: Iquery;
}) {
  const searchParam = query?.search?.toString();
  const pageParam = query?.page?.toString();
  const themeParam = query?.theme?.toString();
  const totalRenderedElems = searchParam ?  items.filter(pokemon => pokemon.name.includes(searchParam)) : items
  const filtredItems = searchParam && pageParam ? 
  items.filter(pokemon => pokemon.name.includes(searchParam)).slice((Number(pageParam) - 1) * 10, 10 * Number(pageParam)) :
  searchParam ?  items.filter(pokemon => pokemon.name.includes(searchParam)).slice(0, 10) :
  pageParam ? items.slice((Number(pageParam) - 1) * 10, 10 * Number(pageParam)) :
  items.slice(0, 10);
  return (
    <main>
      <header className={`${themeParam === 'dark' ? 'dark' : ''}`}>
        <h1 style={{ padding: '10px' }}>Migration to NextJS</h1>
        <SearchComponent />
      </header>
      <main
        style={{
          color: themeParam=== 'dark' ? 'black' : "#11e51f",
          background: themeParam === 'dark' ? "#c9f9f9": 'white',
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
      {query?.checked && <SelectedFlyoutEl allItems={items}/>}
      </main>
    </main>
  );
}
