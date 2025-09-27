import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./autth/authSlice";
import tasksReducer from "./tasks/tasksSlice.jsx";
import categoriesReducer from "./categories/categoriesSlice.jsx";

 const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
});

export { store };
