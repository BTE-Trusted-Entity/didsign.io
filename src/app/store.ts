import { configureStore } from '@reduxjs/toolkit';

import { VerifiedSignatureSlice } from '../Features/Signer/VerifiedSignatureSlice';

export const store = configureStore({
  reducer: {
    contents: VerifiedSignatureSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
