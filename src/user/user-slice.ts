import { apiSlice } from '../app/api-slice';
import { CreateAccountFormData, User, LoginSignupResponse } from './user-types';
import { GetResponse } from '../types';
import { ROLE } from '../rbac/roles';

const transformer = (state: User) => {
  if (state.role in ROLE) {
    return {
      ...state,
      role: state.role as keyof typeof ROLE
    }
  }
  return state;
}

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
          data: transformer((response.data as any).data),
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
          data: transformer((response.data as any).data),
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
