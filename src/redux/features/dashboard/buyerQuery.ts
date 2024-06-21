import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const buyerQuery = createApi({
  reducerPath: "buyerQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    checkout: builder.mutation({
        query: (body: { location: string, otherInformation: string, phoneNumber: string }) => ({
            url: "/order",
            method: "POST",
            body,
        }),
    })
    })
});

export const {   } = buyerQuery;


