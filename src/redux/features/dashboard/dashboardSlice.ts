import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {sidePanel} from "../../../app/dashboard/components/utils/utils";

interface IProps {
  sidePanelButton: string;
  image: string[];
}

const initialState: IProps = {
  sidePanelButton: sidePanel?.OVERVIEW,
  image: []
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setNavButton: (state, action: PayloadAction<any>) => {
      state.sidePanelButton = action.payload;
    },
    setAddImages: (state, action: PayloadAction<any>) => {
      state.image.push(action.payload);
    },

  },
});

// export const dashboardActions = dashboardSlice.actions;
export const{setAddImages, setNavButton} = dashboardSlice.actions
export default dashboardSlice.reducer;
