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
<<<<<<< HEAD

    getOverviewOrderTable: builder.query({
        query: () => ({
          url: "/order/recent",
=======
    getOverviewOrderTable: builder.query({
      query: () => ({
        url: "/product/recent",
        method: "GET",
      }),
    }),
    getOverviewRecentProductImage: builder.query({
      query: () => ({
          url: "/product/top",
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
          method: "GET",
      }),
    }),

})
});
export const { useCheckoutMutation, useGetViewAllOrdersQuery, useGetOrderDetailsQuery, useGetOverviewOrderTableQuery, useGetOverviewRecentProductImageQuery  } = buyerQuery;



