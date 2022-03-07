import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { createHashFromHashArray } from '../../Utils/sign-helpers'

interface HashState {
  hashArray: string[]
  finalHash: string
  sign: string
  signStatus:
    | 'Verified'
    | 'Not Checked'
    | 'Validating'
    | 'Corrupted'
    | 'Multiple Sign'
    | 'Invalid'
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
      return {
        ...state,
        hashArray: initialState.hashArray,
        finalHash: initialState.finalHash,
        sign: initialState.sign,
        signStatus: initialState.signStatus,
      }
    },
    addJwsHashArray: (state, action: PayloadAction<string[]>) => {
      state.hashArray = state.hashArray.concat(action.payload)
    },
    addJwsSign: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        sign: action.payload,
      }
    },
    updateSignStatus: (
      state,
      action: PayloadAction<
        | 'Verified'
        | 'Not Checked'
        | 'Validating'
        | 'Corrupted'
        | 'Multiple Sign'
        | 'Invalid'
      >
    ) => {
      return {
        ...state,
        signStatus: action.payload,
      }
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
