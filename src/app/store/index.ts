import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
import logger from 'redux-logger';
import postsReducer from '../states/post-state'
import userReducer, { userSlice } from '../states/user-state'
import { apiSlice } from '../api-slice';

const middlewares = [apiSlice.middleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const reducers = combineReducers({
  [userSlice.reducerPath]: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  posts: postsReducer,
  users: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [userSlice.reducerPath],
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