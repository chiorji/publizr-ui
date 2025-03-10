import { GetResponse } from '../types';
import { Category } from './category-types';
import { protectedSlice } from '../api-store/api-slice';

export const categorySlice = protectedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<GetResponse<Category[]>, void>({
      query: () => '/categories'
    }),

    addCategory: builder.mutation<void, string>({
      query: (name) => ({
        url: '/categories',
        method: 'POST',
        body: { name },
      }),
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
    })
  })
});


export const { useGetAllCategoriesQuery } = categorySlice;
