import type { RootState } from '../../app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Popup {
  show: boolean;
}

// Define the initial state using that type
const initialState: Popup = {
  show: false,
};
export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        show: action.payload,
      };
    },
  },
});

export const { showPopup } = popupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPopup = (state: RootState) => state.popup.show;

export default popupSlice.reducer;
