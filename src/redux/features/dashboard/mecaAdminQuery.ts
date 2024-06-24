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
        method:"GET"
      }),
    }),
    getMecaAdminDashboardVendor: builder.query({
      query: ({ page, size }: { page: number; size: number }) => ({
        url: `/dashboard/meca-vendor?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),
    getViewAllMecaAdminCategory: builder.query({
      query: ({ page, size }: { page:number; size: number }) => ({
        url: `/category/all?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),
    getMecaAdminInventory: builder.mutation({
      query: ({ page, size,availabilityStatus }: { page:number; size: number,availabilityStatus:string })=> ({
        url: `/product/meca-admin/view-all/${page}/${size}`,
        method: "POST",
        params: {availabilityStatus},
      })
    })
  }),
});

export const {useGetMecaAdminInventoryMutation, useAddCategoryMutation, useGetMecaAdminOverviewQuery, useGetTopPerformingVendorsQuery, useGetMecaAdminBuyerQuery,useGetMecaAdminDashboardVendorQuery,useGetViewAllMecaAdminCategoryQuery  } = mecaAdminQuery;


