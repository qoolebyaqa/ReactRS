import { IPokeItem } from '../types';
import { useRouter } from 'next/router';

type itemsProps = {
  item: IPokeItem,
  allItems: IPokeItem[]
};
interface IUpdatedURL {
  pathname: string,
  query: {
    search?: string,
    page?: number,
    checked?: string
  }
}

function Pokeitem(itemsProps: itemsProps) {
  const router = useRouter()

  function handleSelection() {
    const checkedArr = router.query.checked ? JSON.parse(router.query.checked as string) : [] ;
    const checkedResult = checkedArr.includes(itemsProps.item.name) ? checkedArr.filter((val:string) => val !== itemsProps.item.name) : [...checkedArr, itemsProps.item.name];   
    const updatedURL: IUpdatedURL = {
      pathname: router.pathname,
      query: {...router.query, checked: JSON.stringify(checkedResult)}
    }
    if(checkedResult.length < 1) {
      delete updatedURL.query.checked
    }
    router.push(updatedURL)
  }

  return (
    <li style={{ display: 'flex', justifyContent: 'left' }}>
      <input type="checkbox" onChange={handleSelection} checked={router.query.checked ? JSON.parse(router.query.checked as string).includes(itemsProps.item.name) : false} role={`checkbox${itemsProps.item.name}`}/>
      <button
        style={{ width: '150px', margin: '2px 0', marginRight: '20px' }}
        onClick={() => {
          const updatedURL = {
            pathname: `${itemsProps.item.name}`,
            query: {...router.query}
          }
          if(updatedURL.query.name) delete updatedURL.query.name
          router.push(updatedURL)}}
      >
        {itemsProps.item.name}
      </button>
    </li>
  );
}

export default Pokeitem;
