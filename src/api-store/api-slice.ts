import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
const baseUrl = 'http://localhost:8080'

export const protectedSlice = createApi({
  reducerPath: 'protectedSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.authStateSlice.token;
      console.log({token})
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['users', 'posts', 'likes', 'categories'],
});

export const publicSlice = createApi({
  reducerPath: 'publicSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/auth`
  }),
  endpoints: () => ({}),
  tagTypes: ['auth'],
});