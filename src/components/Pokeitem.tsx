import { IPokeItem } from '../types';
import { Link } from 'react-router-dom';

type itemsProps = {
  item: IPokeItem;
};

function Pokeitem(itemsProps: itemsProps) {
  return (
    <li style={{ display: 'flex', justifyContent: 'left' }}>
      <Link to={itemsProps.item.name}>
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
