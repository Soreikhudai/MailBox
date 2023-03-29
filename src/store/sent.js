import { createSlice } from "@reduxjs/toolkit";

const sentSlice = createSlice({
  name: "sent",
  initialState: { mails: [], toatalQuantity: 0 },
  reducers: {
    addMessageToSent(state) {
      state.toatalQuantity++;
    },
  },
});
export default sentSlice.reducer;
