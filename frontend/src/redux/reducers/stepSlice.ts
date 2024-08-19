import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  currentStep: number;
  maxStep: number;
}

// const initialState: StepState = {
//   currentStep: 0, // The step the user is currently on
//   maxStep: 0, // The maximum step the user has reached
// };
// Function to load step state from sessionStorage
const loadStepState = (): StepState => {
  const storedState = sessionStorage.getItem("step");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return {
    currentStep: 0,
    maxStep: 0,
  };
};

// Initialize state from sessionStorage or default to initial values
const initialState: StepState = loadStepState();

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      if (action.payload <= state.maxStep) {
        state.currentStep = action.payload;
        sessionStorage.setItem("step", JSON.stringify(state));
      }
    },
    incrementMaxStep(state) {
      if (state.currentStep === state.maxStep) {
        state.maxStep += 1;
        state.currentStep = state.maxStep;
        sessionStorage.setItem("step", JSON.stringify(state));
      }
    },
  },
});

export const { setStep, incrementMaxStep } = stepSlice.actions;

export default stepSlice.reducer;
