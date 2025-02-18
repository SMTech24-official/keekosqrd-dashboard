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
      query: ({ id, month, year }) => ({
        url: `/make-winer/${id}/${month}/${year}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          status: true,
        },
      }),
      invalidatesTags: ["votes"],
    }),
  }),
});

export const { useGetAllVotesQuery, useSelectWinnerMutation } = votesApi;
