import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sidePanel } from "../../../app/dashboard/utils";

interface IProps {
  sidePanelButton: string;
}

const initialState: IProps = {
  sidePanelButton: sidePanel.OVERVIEW,
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setNavButton: (state, action: PayloadAction<any>) => {
      state.sidePanelButton = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
