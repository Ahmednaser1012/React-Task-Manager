import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./autth/authSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
