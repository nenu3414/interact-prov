// src/redux/slices/userSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IEntity {
  id: string;
  type: string;
  name: string;
  desc: string;
  date: string;
  location: string;
  version: string;
}

export interface IActivity {
  id: string;
  name: string;
  desc: string;
  startTime: string;
  endTime: string;
  consumed: string;
  generated: string;
}

export interface IAgent {
  id: string;
  type: string;
  name: string;
  desc: string;
}

export interface IRelationship {
  id1: string;
  relation: string;
  id2: string;
}

interface InitialState {
  entities: IEntity[];
  activities: IActivity[];
  agents: IAgent[];
  relationships: IRelationship[];
  error: string;
  loading: boolean;
}

// The initial state of your Redux store
const initialState: InitialState = {
  entities: JSON.parse(sessionStorage.getItem("entities") || "[]"),
  activities: JSON.parse(sessionStorage.getItem("activities") || "[]"),
  agents: JSON.parse(sessionStorage.getItem("agents") || "[]"),
  relationships: JSON.parse(sessionStorage.getItem("relationships") || "[]"),
  error: "",
  loading: false,
};

const provSlice = createSlice({
  name: "prov",
  initialState,
  reducers: {
    addEntity(state, action: PayloadAction<IEntity>) {
      // Check if the entity already exists by id
      const existingEntityIndex = state.entities.findIndex(
        (entity) => entity.id === action.payload.id
      );

      if (existingEntityIndex === -1) {
        // Only add if the entity does not exist
        state.entities = [action.payload];
      }
      // Store the updated entities in sessionStorage
      sessionStorage.setItem("entities", JSON.stringify(state.entities));
    },
    addActivity(state, action: PayloadAction<IActivity>) {
      const existingActivityIndex = state.activities.findIndex(
        (activity) => activity.id === action.payload.id
      );

      if (existingActivityIndex === -1) {
        // Only add if the activity does not exist
        state.activities = [action.payload];
      }
      // Store the updated activities in sessionStorage
      sessionStorage.setItem("activities", JSON.stringify(state.activities));
    },
    addAgent(state, action: PayloadAction<IAgent>) {
      const existingAgentIndex = state.agents.findIndex(
        (agent) => agent.id === action.payload.id
      );

      if (existingAgentIndex === -1) {
        // Only add if the agent does not exist
        state.agents = [action.payload];
      }
      // Store the updated agents in sessionStorage
      sessionStorage.setItem("agents", JSON.stringify(state.agents));
    },
    addRelationship(state, action: PayloadAction<IRelationship>) {
      state.relationships.push(action.payload);
      sessionStorage.setItem(
        "relationships",
        JSON.stringify(state.relationships)
      );
    },
    clearProv(state) {
      state.entities = [];
      state.activities = [];
      state.agents = [];
      state.relationships = [];
    },
  },
});

export const { addEntity, addActivity, addAgent, addRelationship, clearProv } =
  provSlice.actions;

export default provSlice.reducer;
