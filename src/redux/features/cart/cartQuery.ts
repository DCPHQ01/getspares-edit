import customFetchBase from "../../customFetchBaseQuery";
import {createApi} from "@reduxjs/toolkit/query/react";


export const cartQuery = createApi({
   reducerPath: "cartQuery",
   tagTypes:[],
   baseQuery: customFetchBase,
   endpoints: (builder) => ({
      addSingleProductToCart: builder.mutation({
         query: (body) => ({
            url: "/cart/AddProductToCart",
            method: "POST",
            body,
         }),
      }),
   })
})

export const {
   useAddSingleProductToCartMutation
} = cartQuery
