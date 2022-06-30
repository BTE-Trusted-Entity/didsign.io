import type { RootState } from '../../app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestForAttestation } from '@kiltprotocol/sdk-js';

import { Signature } from '../../Utils/types';

const initialState: Signature = {
  signature: '',
  credentials: undefined,
};

export const SignatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    clearSign: (state) => {
      return {
        ...state,
        signature: initialState.signature,
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
  },
});

export const { clearSign, updateSign, updateCredentials } =
  SignatureSlice.actions;

export const selectSign = (state: RootState) => state.signature.signature;
export const selectCredentials = (state: RootState) =>
  state.signature.credentials;

export default SignatureSlice.reducer;
