import { createSlice } from "@reduxjs/toolkit"

const PageSlice = createSlice({
  name: 'PageSlice',
  initialState: {       
    currentPage: 1, 
  } as {currentPage: number},
  reducers: {
    changePage(state, type) {
      if (type.payload === 'next') {
        state.currentPage ++;
      } else if (type.payload === 'prev') {
        state.currentPage --;
      } else {
        state.currentPage = 1
      }
    }
  }
})
export const pageActions = PageSlice.actions;
export default PageSlice.reducer;