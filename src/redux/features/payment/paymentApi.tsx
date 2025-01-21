import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET products endpoint (unchanged)
    getAllPayments: build.query({
      query: ({ month, year }) => ({
        url: `/payments/${month}/${year}`,
        method: "GET",
      }),
      providesTags: ["payments"],
    }),

   
  }),
});

export const { useGetAllPaymentsQuery} = paymentApi;
