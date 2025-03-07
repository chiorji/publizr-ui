import { apiSlice, uploadAPISlice } from '../app/api-slice';
import { DeletePostParams, NewPostRequest, Post, UpdatePostRequest } from './post-types';
import { GetResponse } from '../types';

export const postAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recent: builder.query<GetResponse<Post[]>, null>({
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

    updatePost: builder.mutation<void, UpdatePostRequest>({
      query: (payload) => ({
          url: `api/posts/update/${payload.id}`,
          method: 'PUT',
          body: payload
      }),
      invalidatesTags: ['posts']
    }),

    deletePost: builder.mutation<void, DeletePostParams>({
      query: (payload) => ({
        url: 'api/posts/delete',
        method: 'DELETE',
        body: payload
      }),
      invalidatesTags: ['posts']
    }),

    featurePost: builder.mutation<void, number> ({
      query: (postId) => ({
        url: `api/posts/update/feature/${postId}`,
        method: 'PUT'
      }),
      invalidatesTags: ['posts']
    })
  }),
});


export const uploadSlice = uploadAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    publishPost: builder.mutation<void, NewPostRequest>({
      query: (payload) => ({
        url: 'api/posts/publish',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['posts']
    }),
  }),
})

export const {
  useRecentQuery,
  useAllQuery,
  useByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useByAuthorIdQuery,
  useFeaturePostMutation
} = postAPISlice;

export const { usePublishPostMutation } = uploadSlice;