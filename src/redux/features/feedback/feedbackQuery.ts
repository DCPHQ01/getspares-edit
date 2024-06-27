import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
import build from "next/dist/build";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const feedbackQuery = createApi({
  reducerPath: "feedbackQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (feedback: {
        comment: string;
        orderId: string;
        productId: string;
        rating: 0;
      }) => ({
        url: "/feedback/product",
        method: "POST",
        body: feedback,
      }),
    }),

    getAllBuyersFeedback: builder.query({
      query: ({ productId }: { productId: string }) => ({
        url: `/feedback/${productId}`,
        method: "GET",
      }),
    }),

    getViewBuyersProductDetails: builder.query({
      query: ({ productId }: { productId: string }) => ({
        url: `/product/detail/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllBuyersFeedbackQuery,
  useGetViewBuyersProductDetailsQuery,
} = feedbackQuery;
