import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import useGetToken from "../app/hooks/useGetToken";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const customFetchBase = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = useGetToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

export default customFetchBase;
