import { baseApi } from '../baseApi';

const reviewApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createReview: builder.mutation({
      query: (data: any) => {
        return {
          url: '/review',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['review'],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/review/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['review'],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/review/${id}/status`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['review'],
    }),
    deleteReview: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/review/${id}`,
          method: 'DELETE',
          body: data,
        };
      },
      invalidatesTags: ['review'],
    }),
    getAllReview: builder.query({
      query: () => {
        return {
          url: `/review`,
          method: 'GET',
        };
      },
      providesTags: ['review'],
    }),
    getAllReviewByTutorId: builder.query({
      query: id => {
        return {
          url: `/review/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['review'],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
  useGetAllReviewByTutorIdQuery,
  useGetAllReviewQuery,
} = reviewApi;
