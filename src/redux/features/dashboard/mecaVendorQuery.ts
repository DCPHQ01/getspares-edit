import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../customFetchBaseQuery";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const mecaVendorQuery = createApi({
    reducerPath: "mecaVendorQuery",
    baseQuery:customFetchBase,
    endpoints: (builder) => ({
        getMecaVendorOverview: builder.query({
          query:() =>  ({
            url: "/dashboard/vendor-overview",
            method: "GET",
          }) 
        }),
        getVendorAdminInventory: builder.mutation({
          query: (body: { pageNumber: number; pageSize: number })=> ({
            url: "/product/vendor/view-all",
            method: "POST",
            body,
    
          })
        })
    })
})

export const {useGetMecaVendorOverviewQuery,useGetVendorAdminInventoryMutation} = mecaVendorQuery;