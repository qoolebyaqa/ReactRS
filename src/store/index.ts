import { configureStore } from '@reduxjs/toolkit';
import PokeSlice from './PokeSlice';
import PageSlice from './PageSlice';
import apiSlice from './ApiSlice';
/* import DownloadApiSlice from './DownloadApiSlice'; */


const store = configureStore({
  reducer: {
    PokeStore: PokeSlice,
    PageStore: PageSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    /* [DownloadApiSlice.reducerPath]: DownloadApiSlice.reducer */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      /* .concat(DownloadApiSlice.middleware) */,
});



export default store;
