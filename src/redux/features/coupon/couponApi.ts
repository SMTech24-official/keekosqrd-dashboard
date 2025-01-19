import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupon: builder.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),
      
    addCoupon: builder.mutation({
      query: (formData) => ({
        url: "/coupon",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["coupon"],
    }),
    applyCoupon: builder.mutation({
      query: (formData) => ({
        url: "/coupon",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["coupon"],
    }),

  }),
});

export const { useAddCouponMutation,useGetAllCouponQuery,useApplyCouponMutation } = couponApi;
