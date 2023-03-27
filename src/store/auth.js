import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: { isAuthenticated: false, token: null, userId: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
    },
  },
});
export const authActions = authSlice.actions;
export const selectToken = (state) => state.authentication.token;
export default authSlice.reducer;
