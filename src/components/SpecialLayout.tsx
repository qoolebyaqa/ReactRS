import SearchComponent from './SearchComponent';
import Pokelist from './Pokelist';
import { IPokeItem } from '../types';
import { useRouter } from 'next/router';
import SelectedFlyoutEl from './SelectedFlyoutEl';

export default function SpecialLayout({
  children,
  items,
}: {
  children: React.ReactNode;
  items: IPokeItem[];
}) {
  const router = useRouter();
  const searchParam = router.query.search?.toString();
  const pageParam = router.query.page?.toString();
  const totalRenderedElems = searchParam ?  items.filter(pokemon => pokemon.name.includes(searchParam)) : items
  const filtredItems = searchParam && pageParam ? 
  items.filter(pokemon => pokemon.name.includes(searchParam)).slice((Number(pageParam) - 1) * 10, 10 * Number(pageParam)) :
  searchParam ?  items.filter(pokemon => pokemon.name.includes(searchParam)).slice(0, 10) :
  pageParam ? items.slice((Number(pageParam) - 1) * 10, 10 * Number(pageParam)) :
  items.slice(0, 10);
  return (
    <main>
      <header className={`${router.query.theme === 'dark' ? 'dark' : ''}`}>
        <h1 style={{ padding: '10px' }}>Migration to NextJS</h1>
        <SearchComponent />
      </header>
      <main
        style={{
          color: router.query.theme === 'dark' ? 'black' : "#11e51f",
          background: router.query.theme === 'light' ? 'white' : "#c9f9f9",
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
      {router.query.checked && <SelectedFlyoutEl allItems={items}/>}
      </main>
    </main>
  );
}
