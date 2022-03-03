import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {
  ISignatureEndPoint,
  ISignatureEndPointWithStatus,
} from '../../Utils/types'
import { replaceFileStatus } from '../../Utils/verify-helper'

const initialState: ISignatureEndPointWithStatus = {
  signatureWithEndpoint: { signature: '', did: '', urls: [], types: [] },
  fileStatus: [],
}
export const EndpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    clearEndpoint: (state) => {
      state.signatureWithEndpoint.signature =
        initialState.signatureWithEndpoint.signature
      state.signatureWithEndpoint.did = initialState.signatureWithEndpoint.did
      state.signatureWithEndpoint.urls = initialState.signatureWithEndpoint.urls
      state.signatureWithEndpoint.types =
        initialState.signatureWithEndpoint.types
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, action: PayloadAction<ISignatureEndPoint>) => {
      state.signatureWithEndpoint.signature = action.payload.signature
      state.signatureWithEndpoint.types =
        state.signatureWithEndpoint.types.concat(action.payload.types)
      state.signatureWithEndpoint.urls =
        state.signatureWithEndpoint.urls.concat(action.payload.urls)
      state.signatureWithEndpoint.did = action.payload.did
    },
    updateAllFilesStatus: (state, action: PayloadAction<boolean[]>) => {
      state.fileStatus = state.fileStatus.concat(action.payload)
    },
    updateIndividualFileStatus: (state, action: PayloadAction<boolean>) => {
      state.fileStatus = state.fileStatus.concat(action.payload)
    },
    updateIndividualFileStatusOnIndex: (
      state,
      action: PayloadAction<number>
    ) => {
      state.fileStatus[action.payload] = true
    },
    deleteFilestatus: (state, action: PayloadAction<number>) => {
      state.fileStatus.splice(action.payload, 1)
    },

    replaceStatus: (state) => {
      return {
        ...state,
        fileStatus: replaceFileStatus(state.fileStatus),
      }
    },
  },
})

export const {
  clearEndpoint,
  update,
  updateIndividualFileStatus,
  updateIndividualFileStatusOnIndex,
  updateAllFilesStatus,
  deleteFilestatus,
  replaceStatus,
} = EndpointSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEndpointURL = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.urls
export const selectEndpointTypes = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.types
export const selectVerifiedDid = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.did
export const selectVerifiedSign = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.signature
export const fileStatus = (state: RootState) => state.endpoint.fileStatus
export default EndpointSlice.reducer
