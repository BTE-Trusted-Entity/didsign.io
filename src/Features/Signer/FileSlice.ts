import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface IBuffer {
  buffer: ArrayBuffer
  name: string
}
interface IFileState {
  values: File[]
  filenames: string[]
  buffers: IBuffer[]
}

// Define the initial state using that type
const initialState: IFileState = {
  values: [],
  filenames: [],
  buffers: [],
}

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    deleteFile: (state, action: PayloadAction<File>) => ({
      ...state,
      values: state.values.filter((element) => element !== action.payload),
    }),
    deleteBuffer: (state, action: PayloadAction<IBuffer>) => ({
      ...state,
      buffers: state.buffers.filter(
        (element) => element.name !== action.payload.name
      ),
    }),
    clearAll: (state) => {
      return {
        ...state,
        values: initialState.values,
        filenames: initialState.filenames,
        buffers: initialState.buffers,
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addFile: (state, action: PayloadAction<File>) => {
      state.values = [...state.values, action.payload]
    },
    addBuffer: (state, action: PayloadAction<IBuffer>) => {
      const arraybuffer = action.payload.buffer
      const name = action.payload.name
      const newBufferObj: IBuffer = { buffer: arraybuffer, name: name }
      state.buffers = [...state.buffers, newBufferObj]
    },
    addFileTop: (state, action: PayloadAction<File>) => {
      state.values = [action.payload, ...state.values]
    },
    updateFileTop: (state, action: PayloadAction<File>) => {
      state.values[0] = action.payload
    },
    addBufferTop: (state, action: PayloadAction<IBuffer>) => {
      const arraybuffer = action.payload.buffer
      const name = action.payload.name
      const newBufferObj: IBuffer = { buffer: arraybuffer, name: name }
      state.buffers = [newBufferObj, ...state.buffers]
    },
    updateBufferTop: (state, action: PayloadAction<IBuffer>) => {
      state.buffers[0] = action.payload
    },
    addFileName: (state, action: PayloadAction<string[]>) => {
      state.filenames = state.filenames.concat(action.payload)
    },
    clearFileName: (state) => {
      return {
        ...state,
        filenames: initialState.filenames,
      }
    },
  },
})

export const {
  deleteFile,
  clearAll,
  addFile,
  addFileTop,
  updateFileTop,
  addFileName,
  clearFileName,
  addBuffer,
  addBufferTop,
  updateBufferTop,
  deleteBuffer,
} = fileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFiles = (state: RootState) => state.files.values
export const selectBuffers = (state: RootState) => state.files.buffers

export const selectFilenames = (state: RootState) => state.files.filenames
export default fileSlice.reducer
