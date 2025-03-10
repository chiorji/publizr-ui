import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from './auth-types';

type InitialState = User & {
  isLoggedIn: boolean,
  token: string | null,
}

const initialState: InitialState = {
  email: '',
  created_at: 0,
  id: 0,
  image_url: '',
  is_deleted: false,
  role: 'VIEWER',
  updated_at: 0,
  username: '',
  isLoggedIn: false,
  token: null
}

export const authStateSlice = createSlice({
  name: 'authStateSlice',
  initialState,
  reducers: {
    setCurrentUser: (_, action: PayloadAction<InitialState>) => {
      return action.payload
    },
    setisLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetStore: () => {
      return initialState
    }
  },
});

export const { setCurrentUser, setisLoggedIn, setToken, resetStore } = authStateSlice.actions;