import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const {useGetAllProductsQuery} = productsApi;
