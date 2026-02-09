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
  }),
});


export const {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} = authApi;