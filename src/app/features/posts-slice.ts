import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../repository/post-repository';

export const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    posts: [] as Post[],
  },
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export const selectAllPosts = (state: { post: ReturnType<typeof postSlice.reducer> }) => state.post.posts;

export default postSlice.reducer;