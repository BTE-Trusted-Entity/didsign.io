import { configureStore } from '@reduxjs/toolkit';

import { VerifiedSignatureSlice } from '../Features/Signer/VerifiedSignatureSlice';
import { fileSlice } from '../Features/Signer/FileSlice';
import { SignatureSlice } from '../Features/Signer/SignatureSlice';
import { jwsHashSlice } from '../Features/Signer/VerifyJwsSlice';

export const store = configureStore({
  reducer: {
    files: fileSlice.reducer,
    signature: SignatureSlice.reducer,
    contents: VerifiedSignatureSlice.reducer,
    jwshash: jwsHashSlice.reducer,
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
