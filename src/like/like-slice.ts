import { Like } from "./like-types";
import { protectedSlice } from "../api-store/api-slice";

export const likeSlice = protectedSlice.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<boolean, Like>({
      query: (payload) => ({
        url: '/likes/like',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['likes']
    }),

    getLikesCount: builder.query<number, number>({
      query: (postId) => `/likes/${postId}`,
      providesTags: ['likes']
    }),

    checkIfUserLikedPost: builder.query<boolean, Like>({
      query: (payload) => ({
        url: `/likes/check?user_id=${payload.user_id}&post_id=${payload.post_id}`,
        method: 'GET'
      }),
      providesTags: ['likes']
    })
  })
})

export const { useLikePostMutation, useGetLikesCountQuery, useCheckIfUserLikedPostQuery } = likeSlice;