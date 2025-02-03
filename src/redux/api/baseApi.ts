import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const BaseUrl = "https://api.ksquaredsourcedcity.com/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
   
    console.log("token", token);
    headers.set("accept", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "products",
    "User",
    "users",
    "votes",
    "payments",
    "members",
    "voters",
    "winner",
    "community"
  ],
  endpoints: () => ({}),
});
