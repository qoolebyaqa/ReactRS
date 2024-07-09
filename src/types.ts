
export interface IAppState {
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

export interface ISearchState {
  searchValue: string;
}

export interface ISearchProp {
  pokemonsUpdater: () => void
}

export type itemsProps = {
  items: IPokeItem[]
}
