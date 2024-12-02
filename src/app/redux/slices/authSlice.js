import { createSlice } from "@reduxjs/toolkit";

// Utility function to check if code is running on the client
const isClient = typeof window !== 'undefined';

const initialState = {
  token: isClient ? localStorage.getItem("token") || null : null,
  credits: isClient ? localStorage.getItem("credits") || 0 : 0,
  isAuthenticated: isClient ? !!localStorage.getItem("token") : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.token = action.payload.token;
        state.credits = action.payload.credits;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("credits", action.payload.credits);
      },
      logout: (state) => {
        state.token = null;
        state.credits = 0;
        state.isAuthenticated = false;
        if (isClient) {
            localStorage.removeItem("token");
            localStorage.removeItem("credits");
        }
      },
      updateCredits: (state, action) => {
        state.credits = action.payload.credits;
        localStorage.setItem("credits", action.payload.credits);
      },
    },
  });
  

export const { loginSuccess, logout, updateCredits } = authSlice.actions;

export default authSlice.reducer;



