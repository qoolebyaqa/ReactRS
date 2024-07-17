import { createSlice } from "@reduxjs/toolkit"
import { IAppState, IPokeItem } from "../types"

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
    selectedItems: []
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
    },
    setSelectedItems(state, item) {
      if(!state.selectedItems.map(val => val.name).includes(item.payload.name)) {
        state.selectedItems = [...state.selectedItems, item.payload]
      } else {
        state.selectedItems = state.selectedItems.filter(val => val.name !== item.payload.name)
      }
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    }
  }
})
export const pokeActions = PokeSlice.actions;
export default PokeSlice.reducer;