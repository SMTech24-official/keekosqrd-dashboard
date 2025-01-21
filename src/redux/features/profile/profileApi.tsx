import { baseApi } from "@/redux/api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get user profile by id
    getMeUser: build.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Update user profile by id
    updateUserProfile: build.mutation({
      query: ({ id, userData }) => ({
        url: `/user/${id}/update`,
        method: "POST",
        body: userData, 
      }),
      invalidatesTags: ["users"], 
    }),
  }),
});

export const { useGetMeUserQuery, useUpdateUserProfileMutation } = profileApi;
