import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {
  ISignatureEndPoint,
  ISignatureEndPointWithStatus,
} from '../../Utils/types'
import { replaceFileStatus } from '../../Utils/verify-helper'

const initialState: ISignatureEndPointWithStatus = {
  signatureWithEndpoint: {
    signature: '',
    did: '',
    endpoints: [],
    w3name: '',
    timestamp: '',
    txHash: '',
  },
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
      state.signatureWithEndpoint.endpoints =
        initialState.signatureWithEndpoint.endpoints
      state.signatureWithEndpoint.w3name =
        initialState.signatureWithEndpoint.w3name
      state.signatureWithEndpoint.timestamp =
        initialState.signatureWithEndpoint.timestamp
      state.signatureWithEndpoint.txHash =
        initialState.signatureWithEndpoint.txHash
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, action: PayloadAction<ISignatureEndPoint>) => {
      state.signatureWithEndpoint.signature = action.payload.signature
      state.signatureWithEndpoint.endpoints =
        state.signatureWithEndpoint.endpoints.concat(action.payload.endpoints)
      state.signatureWithEndpoint.did = action.payload.did
      state.signatureWithEndpoint.w3name = action.payload.w3name
      state.signatureWithEndpoint.timestamp = action.payload.timestamp
      state.signatureWithEndpoint.txHash = action.payload.txHash
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
    deleteFilestatusOnIndex: (state, action: PayloadAction<number>) => {
      state.fileStatus.splice(action.payload, 1)
    },
    clearFileStatuses: (state) => {
      return {
        ...state,
        fileStatus: initialState.fileStatus,
      }
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
  deleteFilestatusOnIndex,
  clearFileStatuses,
  replaceStatus,
} = EndpointSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectServiceEndpoints = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.endpoints
export const selectVerifiedDid = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.did
export const selectVerifiedSign = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.signature
export const selectW3Name = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.w3name
export const selectTimestamp = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.timestamp
export const selectTxHash = (state: RootState) =>
  state.endpoint.signatureWithEndpoint.txHash
export const fileStatus = (state: RootState) => state.endpoint.fileStatus
export default EndpointSlice.reducer
