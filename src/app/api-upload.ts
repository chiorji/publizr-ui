import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { NewPostRequest, UpdatePostRequest } from '../types/post-types';
const baseUrl = 'http://localhost:8080'

export const uploadAPISlice = createApi({
  reducerPath: 'uploadAPISlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.userSlice.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['posts'],
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

    updatePost: builder.mutation<void, UpdatePostRequest>({
      query: (payload) => ({
          url: `api/posts/update/${payload.id}`,
          method: 'PUT',
          body: payload
      }),
      invalidatesTags: ['posts']
    })
  }),
})

export const { usePublishPostMutation, useUpdatePostMutation } = uploadSlice;