import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export type Player = {
    level: number,
    id: string
}

type State = {
    experience: number,
    difficulty: string
}

const initialState: State = {
  experience: 0,
  difficulty: 'trivial'
}

export const encounterInfoSlice = createSlice({
    name: 'encounterinfo',
    initialState: initialState,
    reducers: {
        setEncounterInfo: (state, action: PayloadAction<State>) => {
            state = action.payload

            return state
        }
    }
})

export const selectEncounterInfo = (state: RootState) => state.encounterInfo

export const {setEncounterInfo} = encounterInfoSlice.actions

export default encounterInfoSlice.reducer
