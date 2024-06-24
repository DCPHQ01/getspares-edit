import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (feedback) => ({
        url: "/feedback",
        method: "POST",
        body: feedback,
      }),
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;

//   endpoints: (builder) => ({
//     addCategory: builder.mutation({
//       query: (body: { name: string; image: string }) => ({
//         url: "/category",
//         method: "POST",
//         body,
//       }),
//     }),