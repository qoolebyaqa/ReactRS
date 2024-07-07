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
        <p>{`${this.props.item.url.slice(this.props.item.url.indexOf('pokemon') + 8, -1)}  -  `}</p>
        <p>{`${this.props.item.name} - `}</p>
        <p>{`Deep description in ${this.props.item.url}`}</p>
      </li>
    )
  }
}

export default Pokeitem;