import store from "./store";

export type GlobalStateType = ReturnType<typeof store.getState>;


export interface IAppState {
  items: {
    pokemonsQuery: IPokeItem[] | null;
    pokemons: IPokeItem[] | null;
    totalPokemons: IPokeItem[] | null;
  }
  currentPage: number
  searchValue: string;
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
