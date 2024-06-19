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
    getOverviewMecaAdmin: builder.query({
      query: (params: {
        roleName: string;
        pageNumber: number;
        pageSize: number;
      }) => ({
        url: "/dashboard/meca-admin-dashboard-overview",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useAddCategoryMutation, useGetOverviewMecaAdminQuery } =
  mecaAdminQuery;
