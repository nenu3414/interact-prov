// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prov: null,
};

const provSlice = createSlice({
  name: "prov",
  initialState,
  reducers: {
    setProv(state, action) {
      state.prov = action.payload;
    },
    clearProv(state) {
      state.prov = null;
    },
  },
});

export const { setProv, clearProv } = provSlice.actions;

export default provSlice.reducer;
