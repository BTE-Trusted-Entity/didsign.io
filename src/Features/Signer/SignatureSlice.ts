import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Signature } from '../../Utils/types'

const initialState: Signature = {
  signature: '',
  keyID: '',
}
export const SignatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    clearSign: (state) => {
      return {
        ...state,
        signature: initialState.signature,
        keyID: initialState.keyID,
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateSign: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        signature: action.payload,
      }
    },
    updateDID: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        keyID: action.payload,
      }
    },
  },
})

export const { clearSign, updateSign, updateDID } = SignatureSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSign = (state: RootState) => state.signature.signature
export const selectDid = (state: RootState) => state.signature.keyID

export default SignatureSlice.reducer
