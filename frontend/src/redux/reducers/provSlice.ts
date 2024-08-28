import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IEntity {
  entity_id: string;
  entity_type: string;
  name: string;
  description: string;
  date: string;
  location: string;
  version: string;
}

export interface IActivity {
  activity_id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
}

export interface IAgent {
  agent_id: string;
  agent_type: string;
  name: string;
  description: string;
}

export interface IRelationship {
  relationship_id: string;
  subject: string;
  relationship: string;
  object: string;
}

export interface InitialState {
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
        (entity) => entity.entity_id === action.payload.entity_id
      );

      if (existingEntityIndex >= 0) {
        // Update the existing entity
        state.entities[existingEntityIndex] = action.payload;
      } else {
        // Only add if the entity does not exist
        state.entities.push(action.payload);
      }
      // Store the updated entities in sessionStorage
      sessionStorage.setItem("entities", JSON.stringify(state.entities));
    },
    addActivity(state, action: PayloadAction<IActivity>) {
      // Check if the activity already exists by id
      const existingActivityIndex = state.activities.findIndex(
        (activity) => activity.activity_id === action.payload.activity_id
      );

      if (existingActivityIndex >= 0) {
        // Update the existing activity
        state.activities[existingActivityIndex] = action.payload;
      } else {
        // Only add if the activity does not exist
        state.activities.push(action.payload);
      }
      // Store the updated activities in sessionStorage
      sessionStorage.setItem("activities", JSON.stringify(state.activities));
    },
    addAgent(state, action: PayloadAction<IAgent>) {
      // Check if the agent already exists by id
      const existingAgentIndex = state.agents.findIndex(
        (agent) => agent.agent_id === action.payload.agent_id
      );

      if (existingAgentIndex >= 0) {
        // Update the existing agent
        state.agents[existingAgentIndex] = action.payload;
      } else {
        // Only add if the agent does not exist
        state.agents.push(action.payload);
      }
      // Store the updated agents in sessionStorage
      sessionStorage.setItem("agents", JSON.stringify(state.agents));
    },
    addRelationship(state, action: PayloadAction<IRelationship[]>) {
      action.payload.forEach((newRelationship) => {
        const existingRelationshipIndex = state.relationships.findIndex(
          (relationship) =>
            relationship.relationship_id === newRelationship.relationship_id
        );

        if (existingRelationshipIndex >= 0) {
          // Update the existing relationship
          state.relationships[existingRelationshipIndex] = newRelationship;
        } else {
          // Add the new relationship
          state.relationships.push(newRelationship);
        }
      });

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

      sessionStorage.removeItem("entities");
      sessionStorage.removeItem("activities");
      sessionStorage.removeItem("agents");
      sessionStorage.removeItem("relationships");
    },
  },
});

export const { addEntity, addActivity, addAgent, addRelationship, clearProv } =
  provSlice.actions;

export default provSlice.reducer;
