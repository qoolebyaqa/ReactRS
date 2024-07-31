import { GlobalStateType, IPokeItem } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pokeActions } from '../store/PokeSlice';

type itemsProps = {
  item: IPokeItem;
};

function Pokeitem(itemsProps: itemsProps) {
  const [searchParams] = useSearchParams();
  const selectedItems = useSelector((state: GlobalStateType) => state.PokeStore.selectedItems)
  const dispatch = useDispatch();

  const searchQuery = searchParams.get("page") || 1;

  function handleSelection() {
    dispatch(pokeActions.setSelectedItems(itemsProps.item))
  }


  return (
    <li style={{ display: 'flex', justifyContent: 'left' }}  data-testid="pokelist-item">
      <input type="checkbox" onChange={handleSelection} checked={!!selectedItems.find(val => val.name === itemsProps.item.name)} role={`checkbox${itemsProps.item.name}`}/>
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
