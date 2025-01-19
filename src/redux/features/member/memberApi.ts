/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";


const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: () => ({
        url: "users/get-all",
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    getSingleMember: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    updateSpecificUser: builder.mutation({
      query: ({data, id}) => {
        console.log(data);
        return {
          url: `/users/update-user-admin/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Member"],
    }),
  }),
});

export const {
  useGetAllMembersQuery,
  useGetSingleMemberQuery,
  useUpdateSpecificUserMutation
} = memberApi;
