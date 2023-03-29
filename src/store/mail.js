import { createSlice } from "@reduxjs/toolkit";

const emailInitialState = {
  email: [],
};

const emailSlice = createSlice({
  name: "email",
  initialState: emailInitialState,
  reducers: {
    addEmail(state, action) {
      // Add a new expense to the state
      state.email.push(action.payload);
    },

    deleteEmail(state, action) {
      // Remove an expense from the state
      const id = action.payload;
      state.email = state.email.filter((email) => email.id !== id);
    },
    setEmail(state, action) {
      // Set expenses fetched from backend to the state
      state.email = action.payload;
    },
  },
});

export const { addEmail, deleteEmail, setEmail } = emailSlice.actions;

export default emailSlice.reducer;