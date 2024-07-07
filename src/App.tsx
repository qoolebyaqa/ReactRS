import { Component, ReactNode } from 'react';
import Pokelist from './components/Pokelist';
import SearchComponent from './components/SearchComponent';
import { getPokemons } from './api';

interface ISearchState {
  searchValue: string;
  pokemons: IPokeItem[] | null;
  totalPokemons: IPokeItem[] | null;
  errorCreator: boolean;
  loading: boolean;
}

export interface IPokeItem {
  name: string;
  url: string;
}

class App extends Component<object, ISearchState> {
  constructor(props: object) {
    super(props);
    this.handleUpdatePokemons = this.handleUpdatePokemons.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  state = {
    searchValue: '',
    pokemons: null,
    totalPokemons: null,
    errorCreator: false,
    loading: false,
  };

  async handleUpdatePokemons() {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    await getPokemons();
    const searchValue = localStorage.getItem('currentSearch') || '';
    this.setState((prevState: ISearchState) => ({
      ...prevState,
      loading: false,
      searchValue,
      pokemons:
        prevState.totalPokemons &&
        (localStorage.getItem('currentSearch') !== ''
          ? prevState.totalPokemons.filter((pokemon) =>
              pokemon.name.includes(searchValue)
            )
          : prevState.totalPokemons),
    }));
  }

  handleError() {
    this.setState((prevState) => ({
      ...prevState,
      errorCreator: true,
    }));
  }

  async componentDidMount() {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    const pokemons: IPokeItem[] = await getPokemons();
    this.setState((prevState) => ({
      searchValue: '',
      errorCreator: prevState.errorCreator,
      loading: false,
      totalPokemons: pokemons,
      pokemons: localStorage.currentSearch
        ? pokemons.filter((pokemon) =>
            pokemon.name.includes(localStorage.currentSearch)
          )
        : pokemons,
    }));
  }

  render(): ReactNode {
    if (this.state.errorCreator) {
      throw new Error('User initiates this error');
    }
    return (
      <>
        <h1>Class component task</h1>
        <button onClick={this.handleError} id="errButon">
          Throw an error!
        </button>
        <SearchComponent pokemonsUpdater={this.handleUpdatePokemons} />
        {this.state.loading ? <p>Loading ... -_-</p> : 
        <>{this.state.pokemons && <Pokelist items={this.state.pokemons} />}</>}
      </>
    );
  }
}

export default App;
