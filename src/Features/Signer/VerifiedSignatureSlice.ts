import type { RootState } from '../../app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IVerifiedSignatureContents } from '../../Utils/types';
import { replaceFileStatus } from '../../Utils/verify-helper';

const initialState: IVerifiedSignatureContents = {
  signature: '',
  did: undefined,
  endpoints: [],
  w3name: '',
  timestamp: '',
  txHash: '',
  credentials: [],
  filesStatus: [],
};

export const VerifiedSignatureSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    clearEndpoint: (state) => {
      state.signature = initialState.signature;
      state.did = initialState.did;
      state.endpoints = initialState.endpoints;
      state.w3name = initialState.w3name;
      state.timestamp = initialState.timestamp;
      state.txHash = initialState.txHash;
      state.credentials = initialState.credentials;
    },

    update: (state, action: PayloadAction<IVerifiedSignatureContents>) => {
      state.signature = action.payload.signature;
      state.endpoints = state.endpoints.concat(action.payload.endpoints);
      state.did = action.payload.did;
      state.w3name = action.payload.w3name;
      state.timestamp = action.payload.timestamp;
      state.txHash = action.payload.txHash;
      state.credentials = action.payload.credentials;
    },

    updateAllFilesStatus: (state, action: PayloadAction<boolean[]>) => {
      state.filesStatus = state.filesStatus.concat(action.payload);
    },

    updateIndividualFileStatus: (state, action: PayloadAction<boolean>) => {
      state.filesStatus = [...state.filesStatus, action.payload];
    },

    updateIndividualFileStatusOnIndex: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.filesStatus[action.payload] = true;
    },

    deleteFilestatusOnIndex: (state, action: PayloadAction<number>) => {
      state.filesStatus.splice(action.payload, 1);
    },

    clearFileStatuses: (state) => {
      return {
        ...state,
        filesStatus: initialState.filesStatus,
      };
    },

    replaceStatus: (state) => {
      return {
        ...state,
        fileStatus: replaceFileStatus(state.filesStatus),
      };
    },
  },
});

export const {
  clearEndpoint,
  update,
  updateIndividualFileStatus,
  updateIndividualFileStatusOnIndex,
  updateAllFilesStatus,
  deleteFilestatusOnIndex,
  clearFileStatuses,
  replaceStatus,
} = VerifiedSignatureSlice.actions;

export const selectServiceEndpoints = (state: RootState) =>
  state.contents.endpoints;
export const selectVerifiedDid = (state: RootState) => state.contents.did;
export const selectVerifiedSign = (state: RootState) =>
  state.contents.signature;
export const selectW3Name = (state: RootState) => state.contents.w3name;
export const selectTimestamp = (state: RootState) => state.contents.timestamp;
export const selectTxHash = (state: RootState) => state.contents.txHash;
export const selectAttachedCredentials = (state: RootState) =>
  state.contents.credentials;
export const fileStatus = (state: RootState) => state.contents.filesStatus;

export default VerifiedSignatureSlice.reducer;
