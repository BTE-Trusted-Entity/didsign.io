import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { createHashFromHashArray } from '../../Utils/sign-helpers'

interface HashState {
  hashArray: string[]
  finalHash: string
  sign: string
  signStatus: boolean | 'Not Checked'
}

// Define the initial state using that type
const initialState: HashState = {
  hashArray: [],
  finalHash: '',
  sign: '',
  signStatus: 'Not Checked',
}
export const jwsHashSlice = createSlice({
  name: 'jwshash',
  initialState,
  reducers: {
    clearJWS: (state) => {
      state.hashArray = initialState.hashArray
      state.finalHash = initialState.finalHash
      state.sign = initialState.sign
    },
    addJwsHashArray: (state, action: PayloadAction<string[]>) => {
      state.hashArray = action.payload
    },
    addJwsSign: (state, action: PayloadAction<string>) => {
      state.sign = action.payload
    },
    updateSignStatus: (state, action: PayloadAction<boolean>) => {
      state.signStatus = action.payload
    },
  },
})

export const { clearJWS, addJwsHashArray, addJwsSign, updateSignStatus } =
  jwsHashSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectJwsHash = (state: RootState) => state.jwshash.hashArray
export const selectJwsSign = (state: RootState) => state.jwshash.sign
export const selectJwsSignStatus = (state: RootState) =>
  state.jwshash.signStatus
export const selectBaseHash = async (state: RootState) =>
  await createHashFromHashArray(state.jwshash.hashArray)

export default jwsHashSlice.reducer
