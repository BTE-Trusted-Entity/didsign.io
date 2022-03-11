import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface IBuffer {
  buffer: ArrayBuffer
  name: string
}
interface IFileState {
  value: File[]
  filename: string[]
  buffer: IBuffer[]
}

// Define the initial state using that type
const initialState: IFileState = {
  value: [],
  filename: [],
  buffer: [],
}

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    deleteFile: (state, action: PayloadAction<File>) => ({
      ...state,
      value: state.value.filter((element) => element !== action.payload),
    }),
    deleteBuffer: (state, action: PayloadAction<IBuffer>) => ({
      ...state,
      buffer: state.buffer.filter(
        (element) => element.name !== action.payload.name
      ),
    }),
    clearAll: (state) => {
      return {
        ...state,
        value: initialState.value,
        filename: initialState.filename,
        buffer: initialState.buffer,
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addFile: (state, action: PayloadAction<File>) => {
      state.value = [...state.value, action.payload]
    },
    addBuffer: (state, action: PayloadAction<IBuffer>) => {
      const arraybuffer = action.payload.buffer
      const name = action.payload.name
      const newBufferObj: IBuffer = { buffer: arraybuffer, name: name }
      state.buffer = [...state.buffer, newBufferObj]
    },
    addFileTop: (state, action: PayloadAction<File>) => {
      state.value = [action.payload, ...state.value]
    },
    addBufferTop: (state, action: PayloadAction<IBuffer>) => {
      const arraybuffer = action.payload.buffer
      const name = action.payload.name
      const newBufferObj: IBuffer = { buffer: arraybuffer, name: name }
      state.buffer = [newBufferObj, ...state.buffer]
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
  addBuffer,
  addBufferTop,
  deleteBuffer,
} = fileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFile = (state: RootState) => state.files.value
export const selectBuffer = (state: RootState) => state.files.buffer

export const selectFilename = (state: RootState) => state.files.filename
export default fileSlice.reducer
