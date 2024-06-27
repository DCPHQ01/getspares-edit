
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";

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
      query: (productId) => ({
        url: `/feedback/${productId}`,
        method: "GET",
      }),
    }),

    getViewBuyersProductDetails: builder.query({
      query: (productId) => ({
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
