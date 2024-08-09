import store from "./store";

export type GlobalStateType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

export interface IAppState {
  items: {
    pokemonsQuery: IPokeItem[] | null;
    totalPokemons: IPokeItem[] | null;  
    pokemons: IPokeItem[] | null;
  };
  activeCard: object;
  searchValue: string;
  errorCreator: boolean;
  loading: boolean;
  theme: boolean;
  selectedItems: IPokeItem[] | [];
  blobUrl: string
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
  items: IPokeItem[],
  totalLength: number
}

export interface IResponse {
  count: number,
  next: null | string,
  previous: null | string,
  results: IPokeItem[]
}