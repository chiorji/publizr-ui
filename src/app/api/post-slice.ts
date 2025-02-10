import { apiSlice } from '../api-slice';
import { Post, NewPostFormData, GetResponse } from '../../types/post-types';

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recent: builder.query<GetResponse<Post[]>, void> ({
      query: () => 'api/posts/recent'
    }),

    all: builder.query<GetResponse<Post[]>, void>({
      query: () => 'api/posts'
    }),

    byAuthorId: builder.query<GetResponse<Post[]>, number>({
      query: (id) => `api/posts/author/${id}`
    }),

    byId: builder.query<GetResponse<Post>, string | number>({
      query: (id) => `api/posts/${id}`
    }),

    createPost: builder.mutation<void, NewPostFormData>({
      query: (payload) => ({
        url: 'api/posts/publish',
        method: 'POST',
        body: payload,
      }),
    }),

    updatePost: builder.mutation<void, Partial<Post>>({
      query: (payload) => ({
        url: 'api/posts',
        method: 'PUT',
        body: payload,
      }),
    }),

    deletePost: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRecentQuery,
  useAllQuery,
  useByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useByAuthorIdQuery
} = postSlice;
