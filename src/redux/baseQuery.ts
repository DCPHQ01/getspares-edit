import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseQueryAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    // const token = session?.user?.access_token;
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    //   headers.set("Content-Type", `application/json`);
    // }
    return headers;
  },
});
