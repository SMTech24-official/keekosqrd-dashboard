import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBooking: build.query({
      query: ({ page, limit }) => ({
        url: `/admin/bookings?page=${page}&limit=${limit}`,
        method: 'GET'
      }),
      providesTags : ["driverAssign"]
    }),
  
  })
})

export const { useGetAllBookingQuery } = bookingApi;

