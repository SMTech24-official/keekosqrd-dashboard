import { baseApi } from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/services?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    serviceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/services/${id}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["service"],
    }),
    addService: builder.mutation({
      query: (formData) => ({
        url: "/services",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const { useGetAllServiceQuery, useServiceStatusMutation,useAddServiceMutation } = serviceApi;
