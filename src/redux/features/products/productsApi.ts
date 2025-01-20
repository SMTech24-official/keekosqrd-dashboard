import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET products endpoint (unchanged)
    getAllProducts: build.query({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    // POST product endpoint for adding a new product
    addProduct: build.mutation({
      query: (formData) => ({
        url: `/products`,  
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,  
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery, useAddProductMutation, useDeleteProductMutation } = productsApi;
