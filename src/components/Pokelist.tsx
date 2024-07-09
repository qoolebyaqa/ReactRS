import Pokeitem from "./Pokeitem";
import { itemsProps } from "../types";



function Pokelist (itemsProps: itemsProps) {
  return (
    <main>      
      <ul>
        {itemsProps.items.map(pokemon=> <Pokeitem item={pokemon} key={pokemon.url}/>)}        
      </ul>
    </main>
  )
}

export default Pokelist;