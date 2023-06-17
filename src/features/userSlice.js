import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userName",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      if (action.payload !== null) {
        state.user = action.payload;
      } else {
        state.user = null;
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
