import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"


export type PartyState = {
    party_levels: number[]
}

const initialState: PartyState = {
    party_levels: [3,3,3,3,3]
}

export const partySlice = createSlice({
    name: 'party',
    initialState,
    reducers: {
        setPartyLevels: (state, action: PayloadAction<number[]>) => {
            state.party_levels = action.payload
        }
    }
})

export const {setPartyLevels} = partySlice.actions

export const selectPartyLEvels = (state: RootState) => state.party.party_levels

export default partySlice.reducer