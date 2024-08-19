import { configureStore } from "@reduxjs/toolkit";
import provSlice from "./reducers/provSlice";
import documentSlice from "./reducers/documentSlice";
import stepSlice from "./reducers/stepSlice";

export const store = configureStore({
  reducer: {
    prov: provSlice,
    doc: documentSlice,
    step: stepSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
