import { GetResponse } from '../../types';
import { Category } from '../../types/category-types';
import { apiSlice } from '../api-slice';

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<GetResponse<Category[]>, void>({
      query: () => '/api/categories'
    }),

    addCategory: builder.mutation<void, string>({
      query: (name) => ({
        url: '/api/categories',
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/categories/${id}`,
        method: 'DELETE',
      }),
    })
  })
});


export const { useGetAllCategoriesQuery } = categorySlice;
