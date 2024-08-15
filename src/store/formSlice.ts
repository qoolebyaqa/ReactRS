import { createSlice } from "@reduxjs/toolkit"
import { countries } from "../helpers";

const formSlice = createSlice({
  name: 'FormState',
  initialState: {
    uncontrolledForm: {},
    countryList: countries(),
    uploadedFile: '',
  },
  reducers: {
    setUncontrolForm(state, confirmedForm) {
      state.uncontrolledForm = confirmedForm.payload
    },
    setUploadedFile(state, file) {
      state.uploadedFile = file.payload
    }
  }
})
export const formActions = formSlice.actions;
export default formSlice.reducer;