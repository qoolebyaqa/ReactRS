import { configureStore } from '@reduxjs/toolkit';
import PokeSlice from './PokeSlice';
import PageSlice from './PageSlice';
import apiSlice from './ApiSlice';


const store = configureStore({
  reducer: {
    PokeStore: PokeSlice,
    PageStore: PageSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
});



export default store;
