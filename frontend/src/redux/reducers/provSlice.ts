// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface IEntity {
  id: string;
  type: string;
  name: string;
  desc: string;
}

interface IActivity {
  id: string;
  type: string;
  name: string;
  desc: string;
}

interface IAgent {
  id: string;
  type: string;
  name: string;
  desc: string;
}

interface IRelationship {
  id1: string;
  relation: string;
  id2: string;
}

interface IProv {
  prov: {
    entity: IEntity;
    activity: IActivity;
    agent: IAgent;
    relationship: IRelationship;
  };
  error: string;
  loading: boolean;
}

interface initialState {
  prov: IProv | null;
  error: "";
  loading: false;
}

const initialState: initialState = {
  prov: null,
  error: "",
  loading: false,
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
