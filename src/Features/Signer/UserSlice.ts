import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface User {
  isSigner: boolean
}

const initialState: User = {
  isSigner: true,
}
export const UserSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    clearType: (state) => {
      return {
        ...state,
        isSigner: initialState.isSigner,
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateType: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSigner: action.payload,
      }
    },
  },
})
export const { clearType, updateType } = UserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userType.isSigner

export default UserSlice.reducer
