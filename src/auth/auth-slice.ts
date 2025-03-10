import { publicSlice } from "../api-store/api-slice";
import { ROLE } from '../rbac/roles';
import { CreateAccountFormData, LoginSignupResponse, User } from "./auth-types";

const transformer = (state: User) => {
  if (state.role in ROLE) {
    return {
      ...state,
      role: state.role as keyof typeof ROLE
    }
  }
  return state;
}

export const authSlice = publicSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginSignupResponse<User>, { email: string, password: string }>({
      query: (body) => ({
        url: '/login',
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
        url: '/signup',
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
      invalidatesTags: ['auth']
    }),

    resetPassword: builder.mutation<boolean, { email: string; password: string }>({
      query: (payload) => ({
        url: '/reset-password',
        method: 'PUT',
        body: payload,
      })
    }),
  })
})

export const { useLoginMutation, useSignupMutation, useResetPasswordMutation } = authSlice;