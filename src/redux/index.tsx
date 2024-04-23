import { configureStore } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
