import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"


type ModalState = {
    currentModal: string
}

const initialState: ModalState = {
    currentModal: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeModal: (state) => {
          state.currentModal = null
        },
        openModal: (state, action: PayloadAction<string>) => {
          state.currentModal = action.payload
        }
    }
})

export const {closeModal, openModal} = modalSlice.actions

export const getCurrentModal = (state: RootState) => state.modal.currentModal

export default modalSlice.reducer