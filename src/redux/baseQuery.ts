import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseQuery = createApi({
  reducerPath: "baseQuery",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerBuyer: builder.mutation({
      query: (body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        roleName: string;
      }) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    registerAgent: builder.mutation({
      query: (body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        roleName: string;
        vendorMerchantId: string[];
      }) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    registerVendor: builder.mutation({
      query: (body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        roleName: string;
        jobTitle: string;
      }) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterBuyerMutation,
  useRegisterAgentMutation,
  useRegisterVendorMutation,
} = baseQuery;
