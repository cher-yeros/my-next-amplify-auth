import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  carts: any[] | null;
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: string; name: string }>) {
      // state.carts = action.payload;
    },
    logout(state) {
      state.carts = null;
    },
  },
});

export const { login, logout } = cartSlice.actions;

export default cartSlice.reducer;
