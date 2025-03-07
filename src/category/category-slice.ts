import { GetResponse } from '../types';
import { Category } from './category-types';
import { apiSlice } from '../app/api-slice';

export const apiCategorySlice = apiSlice.injectEndpoints({
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


export const { useGetAllCategoriesQuery } = apiCategorySlice;
