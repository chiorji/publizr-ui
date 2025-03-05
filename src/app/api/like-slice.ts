import { Like } from "../../types/like";
import { apiSlice } from "../api-slice";

export const likeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<boolean, Like>({
      query: (payload) => ({
        url: 'api/likes/like',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['likes']
    }),

    getLikesCount: builder.query<number, number>({
      query: (postId) => `api/likes/${postId}`,
      providesTags: ['likes']
    }),

    checkIfUserLikedPost: builder.query<boolean, Like>({
      query: (payload) => ({
        url: `api/likes/check?user_id=${payload.user_id}&post_id=${payload.post_id}`,
        method: 'GET'
      }),
      providesTags: ['likes']
    })
  })
})

export const { useLikePostMutation, useGetLikesCountQuery, useCheckIfUserLikedPostQuery } = likeSlice;