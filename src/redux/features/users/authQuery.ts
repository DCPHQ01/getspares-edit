import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "../../../models/loginResponse";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// const getToken = () => {
//   if (typeof window !== "undefined") {
//     return JSON.parse(sessionStorage.getItem("token") || "{}");
//   }
//   return {};
// };

// let token = getToken();
// console.log("token for basequery ", token);

export const authQuery = createApi({
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
        url: "/auth/signup",
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
        url: "/auth/signup",
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
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body: { email: string; otpCode: string }) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: "/auth/login",
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
        url: "/auth/resetOtp",
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
        url: "/auth/resetPassword",
        method: "POST",
        body,
      }),
    }),
    getTopProduct: builder.query({
      query: () => "/product/top",
    }),
    getRecentProduct: builder.query({
      query: () => "/product/recent",
    }),
  }),
});

export const {
  useGetTopProductQuery,
  useGetRecentProductQuery,
  useRegisterBuyerMutation,
  useRegisterAgentMutation,
  useRegisterVendorMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useResetOtpMutation,
  useResetPasswordMutation,
} = authQuery;
