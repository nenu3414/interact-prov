import { createSlice } from "@reduxjs/toolkit";

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
  initialState,
  reducers: {
    saveDocument: (state, action) => {
      sessionStorage.setItem("doc", JSON.stringify(action.payload));
      return action.payload;
    },
    clearDoc(state) {
      state.documentName = "";
      state.author = "";
      state.isPublic = false;

      sessionStorage.removeItem("doc");
    },
  },
});

export const { saveDocument, clearDoc } = documentSlice.actions;
export default documentSlice.reducer;
