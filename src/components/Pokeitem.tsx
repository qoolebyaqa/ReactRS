import { IPokeItem } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

type itemsProps = {
  item: IPokeItem;
};

function Pokeitem(itemsProps: itemsProps) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("page") || 1;

  return (
    <li style={{ display: 'flex', justifyContent: 'left' }}>
      <Link to={`${itemsProps.item.name}?page=${searchQuery}`}>
        <button
          style={{ width: '150px', margin: '2px 0', marginRight: '20px' }}          
        >
          {itemsProps.item.name}
        </button>
      </Link>
    </li>
  );
}

export default Pokeitem;
