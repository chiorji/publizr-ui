import { apiSlice } from '../api-slice';
import { Post, NewPostFormData, GetPostByIdResponse, GetPostsResponse } from '../../types/post-types';

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recent: builder.query<GetPostsResponse, void> ({
      query: () => 'api/posts/recent'
    }),

    all: builder.query<GetPostsResponse, void>({
      query: () => 'api/posts'
    }),

    byId: builder.query<GetPostByIdResponse, string | number>({
      query: (id) => `api/posts/${id}`
    }),

    createPost: builder.mutation<void, NewPostFormData>({
      query: (payload) => ({
        url: 'api/posts',
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
} = postSlice;
