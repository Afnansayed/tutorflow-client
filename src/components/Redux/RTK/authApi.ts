import { baseApi } from '../baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUser: builder.query({
      query: (role) => {
        return {
          url: '/users', 
          method: 'GET',
          params: role ? { role } : {},
        };
      },
      providesTags: ['auth'], 
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => {
        return {
          url: `/users/${userId}`,
          method: 'PATCH',
          body: { status },
        };
      },
      invalidatesTags: ['auth'], 
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: '/users/me', 
          method: 'GET',
        };
      },
      providesTags: ['auth'], 
    }),

    updateMyProfile: builder.mutation({
      query: (data) => {
        return {
          url: `/users/me`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['auth'], 
    }),
  }),
});


export const {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation
} = authApi;