import { configureStore } from '@reduxjs/toolkit';
import PokeSlice from './PokeSlice';
import PageSlice from './PageSlice';



const store = configureStore({
  reducer: { PokeStore: PokeSlice, PageStore: PageSlice },
});

export default store;
