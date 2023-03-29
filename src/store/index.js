import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import emailReducer from "./mail";
import sentReducer from "./sent";
const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    sent: sentReducer,
  },
});
export default store;
