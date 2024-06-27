import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const profileQuery = createApi({
  reducerPath: "profileQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getUserAllUsersProfile: builder.query({
      query: () => ({
        url: "/company/detail",
        method: "GET",
      }),
    }),
  }),
});

export const {useGetUserAllUsersProfileQuery} = profileQuery;
