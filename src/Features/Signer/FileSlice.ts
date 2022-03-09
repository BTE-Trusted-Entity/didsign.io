import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface IFileState {
  value: File[]
  filename: string[]
}

// Define the initial state using that type
const initialState: IFileState = {
  value: [],
  filename: [],
}

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    deleteFile: (state, action: PayloadAction<File>) => ({
      ...state,
      value: state.value.filter((element) => element !== action.payload),
    }),
    clearAll: (state) => {
      return {
        ...state,
        value: initialState.value,
        filename: initialState.filename,
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addFile: (state, action: PayloadAction<File>) => {
      state.value = [...state.value, action.payload]
    },
    addFileTop: (state, action: PayloadAction<File>) => {
      state.value = [action.payload, ...state.value]
    },
    addFileName: (state, action: PayloadAction<string[]>) => {
      state.filename = state.filename.concat(action.payload)
    },
    clearFileName: (state) => {
      return {
        ...state,
        filename: initialState.filename,
      }
    },
  },
})

export const {
  deleteFile,
  clearAll,
  addFile,
  addFileTop,
  addFileName,
  clearFileName,
} = fileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFile = (state: RootState) => state.files.value
export const selectFilename = (state: RootState) => state.files.filename
export default fileSlice.reducer
