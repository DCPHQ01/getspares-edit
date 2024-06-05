import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    step: 1,
    currentStep: 0,

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
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setCompanyForm, setStep, setCurrentStep } = companySlice.actions;
export default companySlice.reducer;
