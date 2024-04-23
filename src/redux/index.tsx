import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./features/users/userSlice";
import companySlice from "./features/company/companySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    company: companySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
