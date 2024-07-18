import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const productsQuery = createApi({
  reducerPath: "productsQuery",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getProductDecription: builder.query({
      query: (productId: string) => `/product/detail/${productId}`,
    }),
    createProduct: builder.mutation({
      query: (body: {
        name: string;
        brand: string;
        price: {
          amount: number;
          currency: string;
        };
        description: string;
        categoryName: string;
        productCondition: string;
        productImages: string[];
        productInformation: {
          manufacturer: string;
          model: string;
          itemWeight: string;
          productionDimension: string;
          countryOfOrigin: string;
          itemModelNumber: string;
          manufacturerPartNumber: string;
        };
        productSpecification: {
          color: string;
          quantityInPack: number;
        };
        quantity: number;
        tags: string[];
        companyName: string;
        // name: string;
        // brand: string;

        // price: {
        //   amount: Number;
        //   currency: string;
        // };
        // description: string;
        // categoryName: string;
        // productCondition: "NEW";
        // productImages: string[];
        // productInformation: {
        //   manufacturer: string;
        //   model: string;
        //   itemWeight: string;
        //   productionDimension: string;
        //   countryOfOrigin: string;
        //   itemModelNumber: string;
        //   manufacturerPartNumber: string;
        // };
        // productSpecification: {
        //   color: string;
        //   quantityInPack: Number;
        // };
        // quantity: number;
        // tags: string[];
        // companyName: string;
      }) => ({
        url: "/product/create-product",
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
        url: "/product/edit-product",
        method: "POST",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
    addProductToCart: builder.mutation({
      query: (body: {
        productId: string;
        buyerId: string;
        quantity?: number;
      }) => ({
        url: "/cart/AddProductToCart",
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
        url: "/cart/removeItemFromCart",
        method: "POST",
        body,
      }),
    }),
    viewCart: builder.query({
      query: (buyerId: string) => ({
        url: `/cart/viewCartItems?buyerId=${buyerId}`,
        method: "GET",
      }),
    }),
    getAllVendorProducts: builder.query({
      query: (body) => ({
        url: "/product/vendor/view-all",
        method: "POST",
        body,
      }),
    }),
    getAllSales: builder.query({
      query: ({vendorId}) => ({
        url: `/inventory/vendor/${vendorId}`,
        method: "GET",
      }),
    })
  }),
});

export const {
  useGetProductDecriptionQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useViewCartQuery,
  useGetAllVendorProductsQuery,
  useGetAllSalesQuery,
} = productsQuery;
