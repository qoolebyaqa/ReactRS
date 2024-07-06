import { Component, ReactNode } from "react";
import { IPokeItem } from "../App";

type itemsProps = {
  item: IPokeItem
}

class Pokeitem extends Component<itemsProps> {
  constructor(props: itemsProps) {
    super(props)
  }
  render(): ReactNode {
    return (
      <li>
        <p>{this.props.item.name}</p>
        <p>{this.props.item.url}</p>
      </li>
    )
  }
}

export default Pokeitem;