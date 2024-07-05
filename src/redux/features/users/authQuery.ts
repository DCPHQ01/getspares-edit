import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "../../../models/loginResponse";
import ResetPassword from "../../../app/forgot-password/page";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
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
    getTopProduct: builder.query({
      query: () => "/product/top",
    }),
    getRecentProduct: builder.query({
      query: () => "/product/recent",
    }),
    getRelatedProduct: builder.query({
      query: (productId) => `/product/related?productId=${productId}`,
    }),
    getAProduct: builder.query({
      query: (productId: string) => `/product/detail/${productId}`,
    }),
    getCategory: builder.query({
      query: () => "/category/categories",
    }),
    getProductInCategory: builder.query({
      query: (body: {
        categoryId: string;
        pageNumber: number;
        pageSize: number;
      }) => ({
        url: "/product",
        method: "POST",
        body,
      }),
    }),
    resetPasswordVerifyEmail: builder.mutation({
      query: (email) => ({
        url: `/auth/reset-password-verify-email?email=${email}`,
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: {
        email: string;
        otpCode: string;
        newPassword: string;
      }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    searchAllProducts: builder.query({
      query: (payloadText: string) => ({
        url: `/product/search/${payloadText}`,
        method: "GET",
      }),
    }),
    getAllCompanies: builder.query({
      query: (payloadText: string) => ({
        url: `/company/search-company?prefix=${payloadText}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAProductQuery,
  useGetRelatedProductQuery,
  useGetTopProductQuery,
  useGetRecentProductQuery,
  useRegisterBuyerMutation,
  useRegisterAgentMutation,
  useRegisterVendorMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useResetOtpMutation,
  useGetCategoryQuery,
  useGetProductInCategoryQuery,
  useResetPasswordVerifyEmailMutation,
  useResetPasswordMutation,
  useSearchAllProductsQuery,
   useGetAllCompaniesQuery,
} = authQuery;
