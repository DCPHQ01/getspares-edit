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
    setAddImages: (state, action: PayloadAction<string[]>) => {
      state.image= action.payload;
    },

  },
});

export const{setAddImages, setNavButton} = dashboardSlice.actions
export default dashboardSlice.reducer;
