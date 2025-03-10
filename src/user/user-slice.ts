import { protectedSlice } from '../api-store/api-slice';
import { User } from './user-types';
import { GetResponse } from '../types';

export const userSlice = protectedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetResponse<User[]>, null>({
      query: () => '/users/list'
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['users']
    })
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation } = userSlice;
