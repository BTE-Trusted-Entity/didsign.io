import type { RootState } from '../../app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestForAttestation } from '@kiltprotocol/sdk-js';

import { Signature } from '../../Utils/types';

const initialState: Signature = {
  signature: '',
  credentials: undefined,
  downloaded: false,
  timestamped: false,
};

export const SignatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    clearSign: (state) => {
      return {
        ...state,
        signature: initialState.signature,
        credentials: initialState.credentials,
        downloaded: initialState.downloaded,
        timestamped: initialState.timestamped,
      };
    },

    updateSign: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        signature: action.payload,
      };
    },

    updateCredentials: (
      state,
      action: PayloadAction<
        { name: string; credential: RequestForAttestation }[]
      >,
    ) => {
      state.credentials =
        action.payload.length > 0
          ? [...action.payload]
          : initialState.credentials;
    },
    updateDownloadStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        downloaded: action.payload,
      };
    },
    updateTimestampStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        timestamped: action.payload,
      };
    },
  },
});

export const {
  clearSign,
  updateSign,
  updateCredentials,
  updateDownloadStatus,
  updateTimestampStatus,
} = SignatureSlice.actions;

export const selectSign = (state: RootState) => state.signature.signature;
export const selectCredentials = (state: RootState) =>
  state.signature.credentials;
export const selectDownloadStatus = (state: RootState) =>
  state.signature.downloaded;
export const selectTimestampStatus = (state: RootState) =>
  state.signature.timestamped;

export default SignatureSlice.reducer;
