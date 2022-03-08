import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface User {
  isSigner: boolean
}

const initialState: User = {
  isSigner: true,
}
export const UserSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    clearRole: (state) => {
      return {
        ...state,
        isSigner: initialState.isSigner,
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateRole: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSigner: action.payload,
      }
    },
  },
})
export const { clearRole, updateRole } = UserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserRole = (state: RootState) => state.userRole.isSigner

export default UserSlice.reducer
