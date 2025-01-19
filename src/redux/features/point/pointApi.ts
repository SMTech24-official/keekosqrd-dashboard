/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";


const pointApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPoints: builder.query({
      query: () => ({
        url: "/point",
        method: "GET",
      }),
      providesTags: ["point"],
    }),
    updatePoint: builder.mutation({
        query: (body) => {
          return {
            url: `point/${body.id}`,
            method: "PATCH",
            body: body,
          };
        },
        invalidatesTags: ["point"],
      }),
  }),
});

export const {
 useGetAllPointsQuery,
 useUpdatePointMutation
} = pointApi;
