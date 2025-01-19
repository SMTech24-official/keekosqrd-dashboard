
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return {
                    url: "/login",
                    method: "POST",
                    body: userInfo,
                }
            },
              invalidatesTags: ["User"]
        }),

        // updateUser: builder.mutation({
        //     query: (userInfo) => {
        //         return {
        //             url: "users/update-profile",
        //             method: "PATCH",
        //             body: userInfo,
        //         }
        //     },
        //     invalidatesTags: ["User"],
        // }),
        // register: builder.mutation({
        //     query: (userInfo) => {
        //         return {
        //             url: "users/register",
        //             method: "POST",
        //             body: userInfo,
        //         }
        //     },
        // }),
        // otp: builder.mutation({
        //     query: (userInfo) => {
        //         return {
        //             url: "users/verify-otp",
        //             method: "POST",
        //             body: userInfo,
        //         }
        //     },
        // }),
        // userData: builder.query({
        //     query: () => ({
        //         url: "users/get-me",
        //         method: "GET",
        //     }),
        //     providesTags: ["User"],
        // }),
        // reviewData: builder.query({
        //     query: () => ({
        //         url: "reading/my-book-review/all",
        //         method: "GET",
        //     }),
        //     providesTags: ["User"],
        // }),
        // userActivity: builder.query({
        //     query: () => ({
        //         url: "activity/get-all/all",
        //         method: "GET",
        //     }),
        //     providesTags: ["User"],
        // }),
    }),
});

export const {useLoginMutation} = authApi;
