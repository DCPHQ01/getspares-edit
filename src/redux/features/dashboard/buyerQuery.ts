import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const buyerQuery = createApi({
  reducerPath: "buyerQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (body: {
        location: string;
        otherInformation: string;
        phoneNumber: string;
      }) => ({
        url: "/order",
        method: "POST",
        body,
      }),
    }),
    getViewAllOrders: builder.query({
      query: ({pageNo, pageSize}) => ({
          url: `/dashboard/allOrders?pageNo=${pageNo}&pageSize=${pageSize}`,
          method: "GET",
      })
    }),

    getOrderDetails: builder.query({
      query: ({ id }) => ({
          url: `/order/${id}`,
          method: "GET",
      })
    }),
    getOverviewOrderTable: builder.query({
        query: () => ({
          url: "/order/recent",

        method: "GET",
      }),
    }),
    getOverviewRecentProductImage: builder.query({
      query: () => ({
          url: "/product/top",
          method: "GET",
      }),
    }),
})
});
export const { useCheckoutMutation, useGetViewAllOrdersQuery, useGetOrderDetailsQuery, useGetOverviewOrderTableQuery, useGetOverviewRecentProductImageQuery  } = buyerQuery;