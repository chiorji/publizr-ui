import { apiSlice } from '../api-slice';
import { Post, NewPostFormData } from '../../types/post-types';

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostOverview: builder.query<Post[], void> ({
      query: () => 'api/posts/overview'
    }),

    getAllPosts: builder.query<Post[], void>({
      query: () => 'api/posts'
    }),

    getPostById: builder.query<Post, string | number>({
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
  useGetPostOverviewQuery,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postSlice;
