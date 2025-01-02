import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state structure
interface SystemState {
  sidebar: boolean;
  active: number;
}

// Define the initial state
const initialState: SystemState = {
  sidebar: true, // Default to sidebar open
  active: 0, // Default to first item as active
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    controlSidebar(state) {
      state.sidebar = !state.sidebar; // Toggle the sidebar state
    },
    setActiveLink(state, action: PayloadAction<number>) {
      state.active = action.payload; // Set the active link based on payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { controlSidebar, setActiveLink } = systemSlice.actions;

export default systemSlice.reducer;
