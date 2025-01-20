import { baseApi } from "@/redux/api/baseApi";

const votesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all votes with dynamic id and current
    getAllVotes: build.query({
      query: ({ month, currentYear }) => ({
        url: `/votes/${month}/${currentYear}`,
        method: "GET",
      }),
      providesTags: ["votes"], 
    }),

    // Post method for selecting a winner
    selectWinner: build.mutation({
      query: ({ userId, month, year }) => ({
        url: `/make-winner/${userId}/${month}/${year}`,
        method: "POST", 
        body: { userId, month, year }, 
      }),
      invalidatesTags: ["votes"], 
    }),
  }),
});

export const { useGetAllVotesQuery, useSelectWinnerMutation } = votesApi;
