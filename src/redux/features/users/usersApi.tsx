import { baseApi } from "@/redux/api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: `/users/show`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Export users using POST method
    exportUsers: build.mutation({
      query: (exportData) => ({
        url: `/export-users`,
        method: "POST",
        body: exportData, 
      }),
      invalidatesTags: ["users"], 
    }),

 
  }),
});

export const { useGetAllUsersQuery, useExportUsersMutation} = usersApi;
