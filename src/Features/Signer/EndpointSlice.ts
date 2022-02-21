import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { ISignatureAndEndPoint } from '../../Utils/types'

const initialState: ISignatureAndEndPoint = {
  signature: '',
  did: '',
  urls: [],
  types: [],
  fileStatus: [],
}
export const EndpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    clearEndpoint: (state) => {
      state.signature = initialState.signature
      state.did = initialState.did
      state.urls = initialState.urls
      state.types = initialState.types
      state.fileStatus = initialState.fileStatus
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, action: PayloadAction<ISignatureAndEndPoint>) => {
      state.signature = action.payload.signature
      state.types = state.types.concat(action.payload.types)
      state.urls = state.urls.concat(action.payload.urls)
      state.did = action.payload.did
      state.fileStatus = action.payload.fileStatus
    },
  },
})

export const { clearEndpoint, update } = EndpointSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEndpointURL = (state: RootState) => state.endpoint.urls
export const selectEndpointTypes = (state: RootState) => state.endpoint.types
export const selectVerifiedDid = (state: RootState) => state.endpoint.did
export const selectVerifiedSign = (state: RootState) => state.endpoint.signature
export const fileStatus = (state: RootState) => state.endpoint.fileStatus

export default EndpointSlice.reducer
