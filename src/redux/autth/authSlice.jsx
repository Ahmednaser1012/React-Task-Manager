import { createSlice } from "@reduxjs/toolkit";

// get user from localStorage
const getUserFromStorage = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

const initialState = {
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(), 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
