import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const userQuery = createApi({
  reducerPath: "userQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getUserDetails: builder.mutation({
      query: (token) => ({
        url: "/auth",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsMutation } = userQuery;
