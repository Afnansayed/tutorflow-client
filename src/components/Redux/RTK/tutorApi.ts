import { baseApi } from '../baseApi';

const tutorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createTutor: builder.mutation({
      query: (data: any) => {
        return {
          url: '/tutor-profile',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['tutor'],
    }),
    updateTutor: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/tutor-profile/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['tutor'],
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: `/tutor-profile/me`,
          method: 'GET',
        };
      },
      providesTags: ['tutor'],
    }),
    getAllTutor: builder.query({
      query: () => {
        return {
          url: `/tutor-profile`,
          method: 'GET',
        };
      },
      providesTags: ['tutor'],
    }),
    getTutorById: builder.query({
      query: id => {
        return {
          url: `/tutor-profile/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['tutor'],
    }),
  }),
});

export const {
  useCreateTutorMutation,
  useUpdateTutorMutation,
  useGetMyProfileQuery,
  useGetAllTutorQuery,
  useGetTutorByIdQuery,
} = tutorApi;
