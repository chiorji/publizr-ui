import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from './user-types';

type InitialState = {
  user: User,
  isAuthenticated: boolean,
  token: string | null,
}

const initialState: InitialState = {
  user: {
    email: '',
    created_at: 0,
    id: 0,
    image_url: '',
    is_deleted: false,
    role: 'VIEWER',
    updated_at: 0,
    username: ''
  } as User,
  isAuthenticated: false,
  token: null
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetStore: (state) => {
      state.user = initialState.user;
      state.token = initialState.token,
      state.isAuthenticated = initialState.isAuthenticated
    }
  },
});

export const { setCurrentUser, setIsAuthenticated, setToken, resetStore } = userSlice.actions;

export const selectAllPosts = (state: { user: ReturnType<typeof userSlice.reducer> }) => state.user.user;