import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: "",
  },
  userDetails: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, { user: action.payload });
    },
    clearUser: (state) => {
      state.user = { token: "" };
      state.userDetails = {};
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
