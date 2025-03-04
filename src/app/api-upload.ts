import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { NewPostRequest } from '../types/post-types';
const baseUrl = 'http://localhost:8080'

export const apiUploadSlice = createApi({
  reducerPath: 'apiUploadSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.users.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['users', 'posts'],
});

export const uploadSlice = apiUploadSlice.injectEndpoints({
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

export const { usePublishPostMutation } = uploadSlice;