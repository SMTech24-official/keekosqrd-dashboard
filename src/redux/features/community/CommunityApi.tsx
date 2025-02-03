import { baseApi } from "@/redux/api/baseApi";

const CommunityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
   
    // POST commu endpoint for adding a new product
    addCommunity: build.mutation({
      query: (formData) => ({
        url: `/community`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["community"],
    }),

      // GET products endpoint (unchanged)
      getAllCommunity: build.query({
        query: () => ({
          url: `/community`,
          method: "GET",
        }),
        providesTags: ["community"],
      }),

// delete community
      deleteCommunity: build.mutation({
        query: (id) => ({
          url: `/community/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["community"],
      }),
  }),
});

export const { useAddCommunityMutation, useGetAllCommunityQuery, useDeleteCommunityMutation } = CommunityApi;
