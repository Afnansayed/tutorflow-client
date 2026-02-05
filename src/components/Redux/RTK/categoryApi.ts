import { baseApi } from '../baseApi';

const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation({
      query: (data: any) => {
        return {
          url: '/category',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['category'],
    }),
    updateCategory: builder.mutation({
      query: (data: any) => {
        return {
          url: '/category',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['category'],
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: '/category',
          method: 'GET',
        };
      },
      providesTags: ['category'],
    }),
    getCategoriesById: builder.query({
      query: id => {
        return {
          url: `/category/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['category'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesByIdQuery,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApi;
