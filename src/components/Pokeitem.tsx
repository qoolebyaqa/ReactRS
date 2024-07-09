import { IPokeItem } from "../types";


type itemsProps = {
  item: IPokeItem
}

function Pokeitem(itemsProps:itemsProps) {
  return (
    <li>
      <p>{`${itemsProps.item.url.slice(itemsProps.item.url.indexOf('pokemon') + 8, -1)}  -  `}</p>
      <p>{`${itemsProps.item.name} - `}</p>
      <p>{`Deep description in ${itemsProps.item.url}`}</p>
    </li>
  )
}

export default Pokeitem;