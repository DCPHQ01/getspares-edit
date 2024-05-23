import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    access_token: "",
  },
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, { isAuthenticated: true, user: action.payload });
    },
    clearUser: (state) => {
      state.user.access_token = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
