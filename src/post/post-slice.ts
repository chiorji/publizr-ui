import { protectedSlice } from '../api-store/api-slice';
import { DeletePostParams, NewPostRequest, Post, UpdatePostRequest } from './post-types';
import { GetResponse } from '../types';

export const postSlice = protectedSlice.injectEndpoints({
  endpoints: (builder) => ({
    publishPost: builder.mutation<void, NewPostRequest>({
      query: (payload) => ({
        url: '/posts/publish',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['posts']
    }),

    recent: builder.query<GetResponse<Post[]>, null>({
      query: () => '/posts/recent',
      providesTags: ['posts']
    }),

    all: builder.query<GetResponse<Post[]>, null>({
      query: () => '/posts',
      providesTags: ['posts']
    }),

    byAuthorId: builder.query<GetResponse<Post[]>, number>({
      query: (id) => `/posts/author/${id}`,
      providesTags: ['posts']
    }),

    byId: builder.query<GetResponse<Post>, string | number>({
      query: (id) => `/posts/${id}`,
      providesTags: ['posts']
    }),

    updatePost: builder.mutation<void, UpdatePostRequest>({
      query: (payload) => ({
          url: `/posts/update/${payload.id}`,
          method: 'PUT',
          body: payload
      }),
      invalidatesTags: ['posts']
    }),

    deletePost: builder.mutation<void, DeletePostParams>({
      query: (payload) => ({
        url: '/posts/delete',
        method: 'DELETE',
        body: payload
      }),
      invalidatesTags: ['posts']
    }),

    featurePost: builder.mutation<void, number> ({
      query: (postId) => ({
        url: `/posts/feature/${postId}`,
        method: 'PUT'
      }),
      invalidatesTags: ['posts']
    })
  }),
});


export const {
  useRecentQuery,
  useAllQuery,
  useByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useByAuthorIdQuery,
  useFeaturePostMutation,
  usePublishPostMutation
} = postSlice;