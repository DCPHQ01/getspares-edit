import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const companyQuery = createApi({
  reducerPath: "companyQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    updateCompany: builder.mutation({
      query: (body: {
        name: string;
        description: string;
        website: string;
        cac: string;
        date_founded: string;
        email: string;
        phoneNumber: string;
        address: [];
      }) => ({
        url: "/company",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useUpdateCompanyMutation } = companyQuery;
