import Pokeitem from "./Pokeitem";
import { itemsProps } from "../types";



function Pokelist (itemsProps: itemsProps) {
  return (
    <div>      
      <ul style={{display: "flex", flexDirection: "column", width: "400px", margin: "0 auto", justifyContent: "center"}}>
        {itemsProps.items.map(pokemon=> <Pokeitem item={pokemon} key={pokemon.url}/>)}        
      </ul>
    </div>
  )
}

export default Pokelist;