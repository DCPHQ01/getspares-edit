import { configureStore } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./features/users/userSlice";
import companySlice from "./features/company/companySlice";
import { baseQuery } from "./baseQuery";
import dashboardSlice from "../redux/features/dashboard/dashboardSlice";
import productSlice from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    [baseQuery.reducerPath]: baseQuery.reducer,
    user: userSlice,
    company: companySlice,
    product: productSlice,
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseQuery.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
