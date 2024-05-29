import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const productsQuery = createApi({
  reducerPath: "productsQuery",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "api/v1/product",
    }),
    getAProduct: builder.query({
      query: (id: string) => `api/v1/product/${id}`,
    }),
    getProductDecription: builder.query({
      query: (productId: string) => `api/v1/product/detail/${productId}`,
    }),
    createProduct: builder.mutation({
      query: (body: {
        name: string;
        description: string;
        price: number;
        quantity: number;
        category: string;
      }) => ({
        url: "api/v1/product/create-product",
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation({
      query: (body: {
        name: string;
        description: string;
        price: number;
        quantity: number;
        category: string;
      }) => ({
        url: "api/v1/product/edit-product",
        method: "POST",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `api/v1/product/${id}`,
        method: "DELETE",
      }),
    }),
    addProductToCart: builder.mutation({
      query: (body: {
        productId: string;
        buyerId: string;
        quantity?: number;
      }) => ({
        url: "api/v1/cart/AddProductToCart",
        method: "POST",
        body,
      }),
    }),
    removeProductFromCart: builder.mutation({
      query: (body: {
        productId: string;
        buyerId: string;
        quantity?: number;
      }) => ({
        url: "api/v1/cart/removeItemFromCart",
        method: "POST",
        body,
      }),
    }),
    viewCart: builder.query({
      query: (buyerId: string) =>
        `/api/v1/cart/viewCartItems?buyerId=${buyerId}`,
    }),
    getCategory: builder.query({
      query: () => "api/v1/product/category",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAProductQuery,
  useGetProductDecriptionQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useViewCartQuery,
  useGetCategoryQuery,
} = productsQuery;
