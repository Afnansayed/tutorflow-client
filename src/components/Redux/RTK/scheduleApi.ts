import { baseApi } from '../baseApi';

const tutorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSchedule: builder.mutation({
      query: (data: any) => {
        return {
          url: '/tutor-schedule',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['tutor-schedule'],
    }),
    updateSchedule: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/tutor-schedule/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['tutor-schedule'],
    }),
    updateScheduleAvailability: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/tutor-schedule/${id}/availability`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['tutor-schedule'],
    }),
    getMySchedule: builder.query({
      query: () => {
        return {
          url: `/tutor-schedule/me`,
          method: 'GET',
        };
      },
      providesTags: ['tutor-schedule'],
    }),
    getMyScheduleById: builder.query({
      query: id => {
        return {
          url: `/tutor-schedule/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['tutor-schedule'],
    }),
    deleteSchedule: builder.query({
      query: id => {
        return {
          url: `/tutor-schedule/${id}`,
          method: 'DELETE',
        };
      },
      providesTags: ['tutor-schedule'],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useDeleteScheduleQuery,
  useGetMyScheduleQuery,
  useGetMyScheduleByIdQuery,
  useUpdateScheduleAvailabilityMutation,
  useUpdateScheduleMutation,
} = tutorApi;
