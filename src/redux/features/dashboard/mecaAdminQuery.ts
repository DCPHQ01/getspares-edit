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
  }),
});

export const { useAddCategoryMutation,useGetMecaAdminDashboardVendorQuery,useGetViewAllMecaAdminCategoryQuery } = mecaAdminQuery;

