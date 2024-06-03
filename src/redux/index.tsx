import { configureStore } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./features/users/userSlice";
import companySlice from "./features/company/companySlice";
import { authQuery } from "./features/users/authQuery";
import dashboardSlice from "../redux/features/dashboard/dashboardSlice";
import productSlice from "./features/product/productSlice";
import { productsQuery } from "./features/product/productsQuery";
import { userQuery } from "./features/users/userQuery";

export const store = configureStore({
  reducer: {
    [authQuery.reducerPath]: authQuery.reducer,
    [productsQuery.reducerPath]: productsQuery.reducer,
    user: userSlice,
    company: companySlice,
    product: productSlice,
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat([
      authQuery.middleware,
      productsQuery.middleware,
      userQuery.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
