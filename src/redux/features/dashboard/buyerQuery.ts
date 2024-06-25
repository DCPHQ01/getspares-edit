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
      query: ({ pageNo, pageSize }) => ({
        url: `/dashboard/allOrders?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
<<<<<<< HEAD
    getOrderDetails: builder.query({
        query: ({ orderId }) => ({
            url: `/order/${orderId}`,
            method: "GET",
        })
    }),


})
});

export const { useCheckoutMutation, useGetViewAllOrdersQuery, useGetOrderDetailsQuery } = buyerQuery;


=======


  }),
});

export const {
  useCheckoutMutation,
  useGetViewAllOrdersQuery,
//   useFeedbackMutation,
} = buyerQuery;
>>>>>>> 2cdd6d23bb63a61ee852c207098eddc2fa3fb66a
