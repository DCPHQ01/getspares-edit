import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const mecaAdminQuery = createApi({
  reducerPath: "mecaAdminQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (body: { name: string; image: string }) => ({
        url: "/category",
        method: "POST",
        body,
      }),
    }),
<<<<<<< HEAD
    getMecaAdminOverview: builder.query({
      query: () => ({
        url: "/dashboard/meca-overview",
        method: "GET",
      }),
    }),
    getTopPerformingVendors: builder.query({
      query: ({ activityPeriod }) => ({
        url: `/dashboard/meca-performer?activityPeriod=${activityPeriod}`,
        method: "GET",
      }),
    }),
    getMecaAdminBuyer: builder.query({
      query: ({ page, size }) => ({
        url: `/dashboard/meca-buyers?page=${page}&size=${size}`,
=======
    getMecaAdminDashboardVendor: builder.query({
      query: ({ page, size }: { page: number; size: number }) => ({
        url: `/dashboard/meca-vendor?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),
    getViewAllMecaAdminCategory: builder.query({
      query: ({ page, size }: { page:number; size: number }) => ({
        url: `/category/all?page=${page}&size=${size}`,
>>>>>>> 7c710c5ee0bac1ae30f80ac807e0b5f24ac2379d
        method: "GET",
      }),
    }),
  }),
});

<<<<<<< HEAD
export const { useAddCategoryMutation, useGetMecaAdminOverviewQuery, useGetTopPerformingVendorsQuery, useGetMecaAdminBuyerQuery } = mecaAdminQuery;
=======
export const { useAddCategoryMutation,useGetMecaAdminDashboardVendorQuery,useGetViewAllMecaAdminCategoryQuery } = mecaAdminQuery;

>>>>>>> 7c710c5ee0bac1ae30f80ac807e0b5f24ac2379d
