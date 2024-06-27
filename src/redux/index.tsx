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
import { companyQuery } from "./features/company/companyQuery";
import { mecaAdminQuery } from "./features/dashboard/mecaAdminQuery";
import { mecaVendorQuery } from "./features/dashboard/mecaVendorQuery";
import { buyerQuery } from "./features/dashboard/buyerQuery";
import { feedbackQuery } from "./features/feedback/feedbackQuery";
import {cartQuery} from "./features/cart/cartQuery";
import { profileQuery } from "./features/profile/profileQuery";

export const store = configureStore({
  reducer: {
    [authQuery.reducerPath]: authQuery.reducer,
    [productsQuery.reducerPath]: productsQuery.reducer,
    [userQuery.reducerPath]: userQuery.reducer,
    [companyQuery.reducerPath]: companyQuery.reducer,
    [mecaAdminQuery.reducerPath]: mecaAdminQuery.reducer,
    [mecaVendorQuery.reducerPath]: mecaVendorQuery.reducer,
    [buyerQuery.reducerPath]: buyerQuery.reducer,
    [feedbackQuery.reducerPath]: feedbackQuery.reducer,
    [profileQuery.reducerPath]: profileQuery.reducer,

    user: userSlice,
     [cartQuery.reducerPath]: cartQuery.reducer,
    // user: userSlice,
    company: companySlice,
    product: productSlice,
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat([
      authQuery.middleware,
      productsQuery.middleware,
      userQuery.middleware,
      companyQuery.middleware,
      mecaAdminQuery.middleware,
      mecaVendorQuery.middleware,
      buyerQuery.middleware,
      feedbackQuery.middleware,

       cartQuery.middleware,
       profileQuery.middleware,

    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
