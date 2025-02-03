import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../types/user-types';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {} as User,
    isAuthenticated: false,
    error: null as string | null,
    isLoading: false,
    isFetching: false,
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const { setCurrentUser, setIsAuthenticated } = userSlice.actions;

export const selectAllPosts = (state: { user: ReturnType<typeof userSlice.reducer> }) => state.user.user;

export default userSlice.reducer;