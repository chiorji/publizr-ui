import { apiSlice } from '../api-slice';
import { CreateAccountFormData, LoginResponse } from '../../types/user-types';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string, password: string }>({
      query: (body) => ({
        url: 'api/users/login',
        method: 'POST',
        body,
      }),
    }),

    signup: builder.mutation<LoginResponse, Omit<CreateAccountFormData, 'confirmPassword'>>({
      query: (payload) => ({
        url: 'api/users/signup',
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
