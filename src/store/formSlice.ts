import { createSlice } from "@reduxjs/toolkit"
import { countries } from "../helpers";
import { InitialState } from "../types";

const formSlice = createSlice({
  name: 'FormState',
  initialState: {
    uncontrolledForm: null,
    controlledForm: null,
    changedKeysControlled: [],
    changedKeys: [],
    countryList: countries(),
    uploadedFile: '',    
    uploadedFileControlled: '',
  } as InitialState,
  reducers: {
    setUncontrolForm(state, confirmedForm) {
      state.uncontrolledForm = confirmedForm.payload
    },
    setUploadedFile(state, file) {
      state.uploadedFile = file.payload
    },
    setChangedKeys(state, keys) {
      state.changedKeys = keys.payload
    },
    
    setControlledForm(state, confirmedForm) {
      state.controlledForm = confirmedForm.payload
    },
    setUploadedFileControlled(state, file) {
      state.uploadedFileControlled = file.payload
    },
    setChangedKeysControlled(state, keys) {
      state.changedKeysControlled = keys.payload
    }
  }
})
export const formActions = formSlice.actions;
export default formSlice.reducer;