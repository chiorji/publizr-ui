import { apiSlice } from '../api-slice';
import { CreateAccountFormData, User, LoginSignupResponse } from '../../types/user-types';
import { GetResponse } from '../../types';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginSignupResponse<User>, { email: string, password: string }>({
      query: (body) => ({
        url: 'api/users/login',
        method: 'POST',
        body,
      }),
      // TODO: properly type the response
      transformResponse: (response: LoginSignupResponse<User>): LoginSignupResponse<User> => {
        return {
          success: response.success,
          message: response.message,
          size: response.size,
          data: (response.data as any).data,
          token: (response.data as any).token,
        }
      }
    }),

    signup: builder.mutation<LoginSignupResponse<User>, Omit<CreateAccountFormData, 'confirmPassword'>>({
      query: (payload) => ({
        url: 'api/users/signup',
        method: 'POST',
        body: payload,
      }),
      // TODO: properly type the response
      transformResponse: (response: LoginSignupResponse<User>): LoginSignupResponse<User> => {
        return {
          success: response.success,
          message: response.message,
          size: response.size,
          data: (response.data as any).data,
          token: (response.data as any).token,
        }
      },
      invalidatesTags: ['users']
    }),

    resetPassword: builder.mutation<boolean, { email: string; password: string }>({
      query: (payload) => ({
        url: 'api/users/reset-password',
        method: 'PUT',
        body: payload,
      })
    }),

    getAllUsers: builder.query<GetResponse<User[]>, null>({
      query: () => 'api/users'
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/users/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['users']
    })
  }),
});

export const { useLoginMutation, useSignupMutation, useResetPasswordMutation, useGetAllUsersQuery, useDeleteUserMutation } = userSlice;
