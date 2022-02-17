import { configureStore } from '@reduxjs/toolkit'
import { fileSlice } from '../Features/Signer/FileSlice'
import { hashSlice } from '../Features/Signer/hashSlice'
import { SignatureSlice } from '../Features/Signer/SignatureSlice'
import { UserSlice } from '../Features/Signer/UserSlice'

export const store = configureStore({
  reducer: {
    hash: hashSlice.reducer,
    files: fileSlice.reducer,
    signature: SignatureSlice.reducer,
    userType: UserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
