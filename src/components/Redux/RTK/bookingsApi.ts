import { baseApi } from '../baseApi';

const bookingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createBookings: builder.mutation({
      query: (data: any) => {
        return {
          url: '/booking',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['bookings'],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/booking/${id}/status`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['bookings'],
    }),
    getTutorBookings: builder.query({
      query: () => {
        return {
          url: '/booking/tutor',
          method: 'GET',
        };
      },
      providesTags: ['bookings'],
    }),
    getTutorBookingById: builder.query({
      query: id => {
        return {
          url: `/booking/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['bookings'],
    }),
    getStudentBookings: builder.query({
      query: () => {
        return {
          url: '/booking/student',
          method: 'GET',
        };
      },
      providesTags: ['bookings'],
    }),
    getAdminBookings: builder.query({
      query: () => {
        return {
          url: '/booking',
          method: 'GET',
        };
      },
      providesTags: ['bookings'],
    }),
  }),
});

export const {
  useCreateBookingsMutation,
  useGetAdminBookingsQuery,
  useGetTutorBookingsQuery,
  useGetStudentBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetTutorBookingByIdQuery,
} = bookingsApi;
