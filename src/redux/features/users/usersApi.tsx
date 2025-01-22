import { baseApi } from "@/redux/api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all users
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

    // Get total payments
    getTotalPayments: build.query({
      query: () => ({
        url: `/payments/total`,
        method: "GET",
      }),
      providesTags: ["payments"], 
    }),

    // Get total members
    getTotalMembers: build.query({
      query: () => ({
        url: `/total-members`,
        method: "GET",
      }),
      providesTags: ["members"], 
    }),

    // Get total voters
    getTotalVoters: build.query({
      query: () => ({
        url: `/total-voters`,
        method: "GET",
      }),
      providesTags: ["voters"], 
    }),

     // Get user payments
     getUserPayments: build.query({
      query: () => ({
        url: `/payments/user`,
        method: "GET",
      }),
      providesTags: ["payments"], 
    }),

     getUserAllVotes: build.query({
      query: () => ({
        url: `/users/voting-history`,
        method: "GET",
      }),
      providesTags: ["votes"], 
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useExportUsersMutation,
  useGetTotalPaymentsQuery,
  useGetTotalMembersQuery,
  useGetTotalVotersQuery,
  useGetUserPaymentsQuery,
  useGetUserAllVotesQuery
} = usersApi;
