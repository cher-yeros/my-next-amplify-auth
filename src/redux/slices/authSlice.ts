import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of your currentUser
export type CurrentUser = {
  id: number;
  name: string;
  email: string;
};

// Define the initial state structure
export type AuthState = {
  currentUser: CurrentUser | {} | any; // Either a User object or an empty object when not logged in
  token: string | null; // Token will be either a string or null
  avatar: string | null; // Avatar will be a string (URL) or null
};

const initialState: AuthState = {
  currentUser: {}, // Default to an empty object
  token: null,
  avatar: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFinished(
      state,
      action: PayloadAction<{
        user: CurrentUser | {};
        token: string | null;
        avatar?: string | null;
      }>
    ) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar || null; // Default to null if no avatar
    },
    logoutFinished(state) {
      state.currentUser = {};
      state.token = null;
      state.avatar = null;
    },
    addAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
    fillFProfile(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
    },
  },
});

export const { loginFinished, logoutFinished, addAvatar, fillFProfile } =
  authSlice.actions;

export default authSlice.reducer;
