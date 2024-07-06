import { Component, ReactNode } from "react";
import Pokelist from "./components/Pokelist";
import SearchComponent from "./components/SearchComponent";
import { getPokemons } from "./api";


interface ISearchState {
  searchValue: string;
  pokemons: IPokeItem[] | null;
  totalPokemons: IPokeItem[] | null;
}

export interface IPokeItem {
  name: string,
  url: string
}


class App extends Component <Object, ISearchState> {  
  constructor(props: Object) {
    super(props)
    this.handleUpdatePokemons = this.handleUpdatePokemons.bind(this)
  }

  state = {
    searchValue: '',
    pokemons: null,
    totalPokemons: null
  }

  handleUpdatePokemons() {
    const searchValue = localStorage.getItem('currentSearch') || '';
    this.setState((prevState: ISearchState) => ({
      searchValue,
      totalPokemons: prevState.totalPokemons,
      pokemons: prevState.totalPokemons && (localStorage.getItem('currentSearch') !=='' ? prevState.totalPokemons.filter(pokemon => pokemon.name === searchValue) : prevState.totalPokemons)
    }));
  }

  async componentDidMount() {
    const pokemons: IPokeItem[] = await getPokemons()
    this.setState({
      searchValue: '',
      totalPokemons: pokemons,
      pokemons: localStorage.currentSearch ? pokemons.filter(pokemon => pokemon.name === localStorage.currentSearch) : pokemons
    })    
  }

  render (): ReactNode {
    return (
      <>
        <h1>Class component task</h1>
        <SearchComponent pokemonsUpdater={this.handleUpdatePokemons}/>
        {this.state.pokemons && <Pokelist items={this.state.pokemons}/>}
      </>
    )
  }
}

export default App;
