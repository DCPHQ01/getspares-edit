import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "@/models/loginResponse";

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
        url: "api/v1/auth/signup",
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
        companyName: string;
      }) => ({
        url: "api/v1/auth/signup",
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
        companyName: string;
      }) => ({
        url: "api/v1/auth/signup",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body: { email: string; otpCode: string }) => ({
        url: "api/v1/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: "/api/login",
          method: "POST",
          body: {
            email,
            password,
          },
        }),
      }
    ),
  }),
});

export const {
  useRegisterBuyerMutation,
  useRegisterAgentMutation,
  useRegisterVendorMutation,
  useVerifyEmailMutation,
  useLoginMutation,
} = baseQuery;
