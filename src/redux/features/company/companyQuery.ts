import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const companyQuery = createApi({
  reducerPath: "companyQuery",
  baseQuery: customFetchBase,
  tagTypes: ["company"],
  endpoints: (builder) => ({
    updateCompany: builder.mutation({
      query: (body: {
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        cac: string;
        companyEmail: string;
        phoneNumber: string;
        address1: string;
        imageUrl: string;
      }) => ({
        url: "/company",
        method: "PATCH",
        body,
        invalidatesTags:['company']

      }),
    }),
    getCompanyProfile: builder.query({
      query:() =>  ({
        url: "/company/detail",
        method: "GET",
      }),
      providesTags:['company']

    }),
  }),
});

export const { useUpdateCompanyMutation, useGetCompanyProfileQuery } = companyQuery;
