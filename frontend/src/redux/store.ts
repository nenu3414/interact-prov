import { configureStore } from "@reduxjs/toolkit";
import provSlice from "./reducers/provSlice";

const store = configureStore({
  reducer: {
    prov: provSlice,
  },
});

export default store;
