import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
  documentName: string;
  author: string;
  isPublic: boolean;
}

const initialState: initialState = {
  documentName: "",
  author: "",
  isPublic: false,
};

const documentSlice = createSlice({
  name: "doc",
  initialState: initialState,
  reducers: {
    saveDocument: (state, action) => {
      sessionStorage.setItem("doc", JSON.stringify(action.payload));
      return action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { saveDocument } = documentSlice.actions;
export default documentSlice.reducer;
