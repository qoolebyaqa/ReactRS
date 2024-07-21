import { createSlice } from "@reduxjs/toolkit"
import { IAppState } from "../types"

const PokeSlice = createSlice({
  name: 'PokemonState',
  initialState: {
    items: {
      pokemonsQuery: [],
      totalPokemons: null, 
    },
    pokemons: null,        
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
      state.items = items.payload
    },
    setPokemons(state, pokemons) {
      state.pokemons = pokemons.payload;
    },
    setLoading(state, bool) {
      state.loading = bool.payload
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