import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types/post-types';

export const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    total: 0,
    message: "",
    data: [] as Post[]
  },
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export const selectAllPosts = (state: { post: ReturnType<typeof postSlice.reducer> }) => state.post.data;

export default postSlice.reducer;