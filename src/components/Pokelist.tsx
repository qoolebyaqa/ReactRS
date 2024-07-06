import { Component, ReactNode } from "react";
import Pokeitem from "./Pokeitem";
import { IPokeItem } from "../App";

type itemsProps = {
  items: IPokeItem[]
}

class Pokelist extends Component<itemsProps> {
  constructor(props: itemsProps) {
    super(props)
  }
  render(): ReactNode {
    return (
      <ul>
        {this.props.items.map(pokemon => <Pokeitem item={pokemon} key={pokemon.url}/>)}        
      </ul>
    )
  }
}

export default Pokelist;