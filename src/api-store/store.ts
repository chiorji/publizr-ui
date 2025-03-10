import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
import logger from 'redux-logger';
import { postStateSlice } from '../post/post-state'
import { authSlice } from '../auth/auth-slice';
import { authStateSlice } from '../auth/auth-state';
import { protectedSlice, publicSlice } from './api-slice';
import { categorySlice } from '../category/category-slice';

const middlewares = [protectedSlice.middleware, publicSlice.middleware, categorySlice.middleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const reducers = combineReducers({
  [protectedSlice.reducerPath]: protectedSlice.reducer,
  [postStateSlice.reducerPath]: postStateSlice.reducer,
  [authStateSlice.reducerPath]: authStateSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch