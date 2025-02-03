import { apiSlice } from '../api-slice';
import { User, CreateAccountFormData } from '../../types/user-types';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string, password: string }>({
      query: (body) => ({
        url: 'api/users/authenticate',
        method: 'POST',
        body,
      }),
    }),

    signup: builder.mutation<void, Omit<CreateAccountFormData, 'confirmPassword'>>({
      query: (payload) => ({
        url: 'api/users',
        method: 'POST',
        body: payload,
      }),
    }),

    resetPassword: builder.mutation<void, { code: string; newPassword: string }>({
      query: (payload) => ({
        url: 'api/password/reset/',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useResetPasswordMutation } =
  userSlice;
