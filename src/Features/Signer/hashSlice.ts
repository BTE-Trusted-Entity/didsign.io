import type { RootState } from '../../app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createHashFromHashArray } from '../../Utils/sign-helpers';

interface HashState {
  value: string[];
  finalHash: string;
}

// Define the initial state using that type
const initialState: HashState = {
  value: [],
  finalHash: '',
};

export const hashSlice = createSlice({
  name: 'hash',
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<string>) => ({
      ...state,
      value: state.value.filter((element) => element !== action.payload),
    }),
    clearHash: (state) => {
      return {
        ...state,
        value: initialState.value,
        finalHash: initialState.finalHash,
      };
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addHash: (state, action: PayloadAction<string>) => {
      state.value = [...state.value, action.payload];
    },
    addHashArray: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    deleteHashFromIndex: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export const {
  deleteItem,
  clearHash,
  addHash,
  addHashArray,
  deleteHashFromIndex,
} = hashSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHash = (state: RootState) => state.hash.value;
export const selectFinalHash = async (state: RootState) =>
  await createHashFromHashArray(state.hash.value);

export default hashSlice.reducer;
