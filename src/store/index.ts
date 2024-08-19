import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';


const store = configureStore({
  reducer: {
    formStore: formSlice,
  }
});



export default store;
