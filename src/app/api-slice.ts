import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'http://localhost:8080'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer `);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Users', 'Posts'],
});
