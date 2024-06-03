import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "../models/loginResponse";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// const getToken = () => {
//   if (typeof window !== "undefined") {
//     return JSON.parse(sessionStorage.getItem("token") || "{}");
//   }
//   return {};
// };

// let token = getToken();
// console.log("token for basequery ", token);

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
          url: "api/v1/auth/login",
          method: "POST",
          body: {
            email,
            password,
          },
        }),
      }
    ),
    resetOtp: builder.mutation({
      query: (body: { email: string }) => ({
        url: "api/v1/auth/resetOtp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: {
        email: string;
        otpCode: string;
        newPassword: string;
      }) => ({
        url: "api/v1/auth/resetPassword",
        method: "POST",
        body,
      }),
    }),
    getUserDetails: builder.mutation({
      query: (token) => ({
        url: "api/v1/auth",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useRegisterBuyerMutation,
  useRegisterAgentMutation,
  useRegisterVendorMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useResetOtpMutation,
  useResetPasswordMutation,
  useGetUserDetailsMutation,
} = baseQuery;
