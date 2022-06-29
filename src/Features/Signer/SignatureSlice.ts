import type { RootState } from '../../app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  signature: '',
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
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateSign: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        signature: action.payload,
      };
    },
  },
});

export const { clearSign, updateSign } = SignatureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSign = (state: RootState) => state.signature.signature;

export default SignatureSlice.reducer;
