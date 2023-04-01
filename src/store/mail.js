import { createSlice } from "@reduxjs/toolkit";

const emailInitialState = {
  email: [],
  sendMessageIsOpen: false,
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

export const {
  addEmail,
  deleteEmail,
  setEmail,
  openSendEmail,
  closeSendEmail,
} = emailSlice.actions;
export const selectSendMessageIsOpen = (state) => state.email.sendMessageIsOpen;
export const emailActions = emailSlice.actions;

export default emailSlice.reducer;
