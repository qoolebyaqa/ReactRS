'use client'
import { IPokeItem } from '../types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { collectURL } from '../fnHelpers/fnHelpers';

type itemsProps = {
  item: IPokeItem,
  allItems: IPokeItem[]
};
interface IUpdatedURL {
  pathname: string,
  query: {
    search?: string,
    page?: number,
    checked?: string,
    theme?: string
  }
}

function Pokeitem(itemsProps: itemsProps) {  
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSelection() {
    const checkedArr = query.get('checked') ? JSON.parse(query.get("checked") as string) : [] ;
    const checkedResult = checkedArr.includes(itemsProps.item.name) ? checkedArr.filter((val:string) => val !== itemsProps.item.name) : [...checkedArr, itemsProps.item.name];   
    const updatedURL: IUpdatedURL = {
      pathname: pathname,
      query: {checked: JSON.stringify(checkedResult)}
    }
    if(query.get('page')) updatedURL.query.page = Number(query.get('page'));
    if(query.get('search')) updatedURL.query.search = String(query.get('search'));
    if(query.get('theme')) updatedURL.query.theme = String(query.get('theme'))
    router.push(collectURL(updatedURL))
    router.refresh()
  }

  return (
    <li style={{ display: 'flex', justifyContent: 'left' }} data-testid='poke-item'>
      <input type="checkbox" onChange={handleSelection} checked={query.get('checked') ? JSON.parse(query.get('checked') as string).includes(itemsProps.item.name) : false} role='checkbox'/>
        <button
          style={{ width: '150px', margin: '2px 0', marginRight: '20px' }}
          onClick={() => {            
            const updatedURL: IUpdatedURL = {
              pathname: `${itemsProps.item.name}`,
              query: {}
            }
            if(query.get('page')) updatedURL.query.page = Number(query.get('page'));
            if(query.get('search')) updatedURL.query.search = String(query.get('search'))
            if(query.get('theme')) updatedURL.query.theme = String(query.get('theme'))
            if(query.get('checked')) updatedURL.query.checked = String(query.get('checked'))
            router.push(collectURL(updatedURL))
            router.refresh()
          }}
        >
          {itemsProps.item.name}
        </button>
    </li>
  );
}

export default Pokeitem;
