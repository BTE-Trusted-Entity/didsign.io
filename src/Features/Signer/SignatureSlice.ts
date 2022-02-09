import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Signature } from '../../Utils/types'


const initialState: Signature = {
    signature: "",
    did: ""
}
export const SignatureSlice = createSlice({
    name: 'signature',
    initialState,
    reducers: {
        clearSign: state => {
            state.signature = initialState.signature
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        updateSign: (state, action: PayloadAction<string>) => {
            state.signature = action.payload
        },
        updateDID: (state, action: PayloadAction<string>) => {
            state.did = action.payload
        }
    }
})
export const { clearSign, updateSign,updateDID } = SignatureSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSign = (state: RootState) => state.signature.signature
export const selectDid = (state: RootState) => state.signature.did


export default SignatureSlice.reducer