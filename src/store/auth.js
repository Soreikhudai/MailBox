import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  userId: userId || null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const authActions = authSlice.actions;
export const selectToken = (state) => state.authentication.token;
export default authSlice.reducer;
