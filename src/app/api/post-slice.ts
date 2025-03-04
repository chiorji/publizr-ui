import { apiSlice } from '../api-slice';
import { Post, GetResponse } from '../../types/post-types';

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recent: builder.query<GetResponse<Post[]>, null> ({
      query: () => 'api/posts/recent',
      providesTags: ['posts']
    }),

    all: builder.query<GetResponse<Post[]>, null>({
      query: () => 'api/posts',
      providesTags: ['posts']
    }),

    byAuthorId: builder.query<GetResponse<Post[]>, number>({
      query: (id) => `api/posts/author/${id}`,
      providesTags: ['posts']
    }),

    byId: builder.query<GetResponse<Post>, string | number>({
      query: (id) => `api/posts/${id}`,
      providesTags: ['posts']
    }),

    updatePost: builder.mutation<void, Partial<Post>>({
      query: (payload) => ({
        url: `api/posts/update/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['posts']
    }),

    deletePost: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `api/posts/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts']
    }),
  }),
});

export const {
  useRecentQuery,
  useAllQuery,
  useByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useByAuthorIdQuery
} = postSlice;
