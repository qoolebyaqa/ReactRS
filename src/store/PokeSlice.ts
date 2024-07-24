import { createSlice } from "@reduxjs/toolkit"
import { IAppState } from "../types"
import { convertToCSV } from "../fnHelpers/fnHelpers"

const PokeSlice = createSlice({
  name: 'PokemonState',
  initialState: {
    items: {
      pokemonsQuery: [],
      totalPokemons: null,
      pokemons: null, 
    },        
    searchValue: '',
    errorCreator: false,
    loading: false,
    theme: false,
    selectedItems: [],
    blobUrl: ''
  } as IAppState,
  reducers: {
    toogleTheme(state, bool) {
      state.theme = bool.payload
    },
    setItems(state, items) {      
      state.items = items.payload
    },
    setLoading(state, bool) {
      state.loading = bool.payload
    },
    setSearchVal(state, str) {
      state.searchValue = str.payload;
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
      const csv = convertToCSV(state.selectedItems);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      state.blobUrl = URL.createObjectURL(blob)
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
    setBlob(state) {
      const csv = convertToCSV(state.selectedItems);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      state.blobUrl = URL.createObjectURL(blob)
    }
  }
})
export const pokeActions = PokeSlice.actions;
export default PokeSlice.reducer;