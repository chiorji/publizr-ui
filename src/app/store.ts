import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import logger from 'redux-logger';
import { postSlice } from '../post/post-state'
import { userSlice } from '../user/user-state'
import { apiSlice, uploadAPISlice } from './api-slice';

const middlewares = [apiSlice.middleware, uploadAPISlice.middleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [uploadAPISlice.reducerPath]: uploadAPISlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [postSlice.reducerPath]: postSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [apiSlice.reducerPath],
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