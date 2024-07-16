import { IAppState, IPokeItem } from './../types';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const PokeSlice = createSlice({
  name: 'PokemonState',
  initialState: {
    items: {
      pokemons: null,
      pokemonsQuery: [],
      totalPokemons: null, 
    },        
    currentPage: 1, 
    searchValue: '',
    errorCreator: false,
    loading: false,
    theme: false,
  } as IAppState,
  reducers: {
    toogleTheme(state, bool) {
      state.theme = bool.payload
    },
    setItems(state, items) {
      const pokemonsUnderQuery = localStorage.currentSearch ? 
      items.payload.filter((pokemon: IPokeItem) => pokemon.name.includes(localStorage.currentSearch)) : 
      items.payload
      
      state.items = {
        totalPokemons: items.payload,
        pokemonsQuery: [...pokemonsUnderQuery],
        pokemons: pokemonsUnderQuery.slice((state.currentPage - 1) * 10, state.currentPage*10)
      }
    },
    setLoading(state, bool) {
      state.loading = bool.payload
    },
    changePage(state, type) {
      if (type.payload === 'next') {
        state.currentPage ++;
      } else if (type.payload === 'prev') {
        state.currentPage --;
      } else {
        state.currentPage = 1
      }
    },
    setError(state, bool) {
      state.errorCreator = bool.payload;
    }
  }
})

const store = configureStore({
  reducer: { PokeStore: PokeSlice.reducer },
});

export const pokeActions = PokeSlice.actions;
export default store;
