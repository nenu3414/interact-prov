import { configureStore } from "@reduxjs/toolkit";
import provSlice from "./reducers/provSlice";
import documentSlice from "./reducers/documentSlice";

export const store = configureStore({
  reducer: {
    prov: provSlice,
    doc: documentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
