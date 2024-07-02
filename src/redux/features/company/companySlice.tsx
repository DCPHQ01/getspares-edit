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
      companyEmail: "",
      phoneNumber: "",
      cac: "",
      address1: "",
      // address2: '',
    },
    productData: {},
  },
  reducers: {
    setCompanyForm: (state, action) => {
      console.log(action.payload, "store");
      state.companyForm = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
  },
});

export const { setCompanyForm, setStep, setCurrentStep, setProductData } =
  companySlice.actions;
export default companySlice.reducer;
