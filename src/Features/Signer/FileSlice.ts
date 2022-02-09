import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface IFileState {
    value: File[]
}

// Define the initial state using that type
const initialState: IFileState = {
    value: []
}

export const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        deleteFile: (state, action: PayloadAction<File>) => ({
            ...state,
            value: state.value.filter(element => element !== action.payload),
        }),
        clearAll: state => {
            state.value = initialState.value
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        addFile: (state, action: PayloadAction<File>) => {
            state.value = [...state.value, action.payload]
        },
        addFileTop: (state, action: PayloadAction<File>) => {
            state.value = [action.payload,...state.value]
        }
    }
})

export const { deleteFile, clearAll, addFile,addFileTop } = fileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFile = (state: RootState) => state.files.value

export default fileSlice.reducer