import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyForm: {
      name: "",
      description: "",
      website: "",
      date_founded: "",
      email: "",
      phoneNumber: "",
      address: [],
    },
  },
  reducers: {
    setCompanyForm: (state, action) => {
      state.companyForm = action.payload;
    },
  },
});

export const { setCompanyForm } = companySlice.actions;
export default companySlice.reducer;
