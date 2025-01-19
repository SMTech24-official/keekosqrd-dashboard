import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetOrderQuery, useGetSingleOrderQuery } = orderApi;
