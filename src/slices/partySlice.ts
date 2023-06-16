import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { uniq, uniqueId } from "lodash"

export type Player = {
    level: number,
    id: string
}

type State = {
    players: Player[]
}

const initialState: State = {
    players: [
        { level: 3, id: uniqueId('player') },
        { level: 3, id: uniqueId('player') },
        { level: 3, id: uniqueId('player') },
        { level: 3, id: uniqueId('player') },
        { level: 3, id: uniqueId('player') }
    ],
}

export const partySlice = createSlice({
    name: 'party',
    initialState,
    reducers: {
        updatePlayer: (state, action: PayloadAction<Player>) => {
            const {
                payload
            } = action

            let index = state.players.findIndex((item: Player) => item.id == payload.id)

            if (index != -1) {
                state.players[index] = payload
            }
            
        },
        removePlayer: (state, action: PayloadAction<string>) => {
            let index = state.players.findIndex((item: Player) => item.id == action.payload)

            if (index != -1) {
                state.players.splice(index, 1)
            }
        },
        addPlayer: (state) => {
            state.players.push({ level: 3, id: uniqueId('player')})
        }
    },
    
})

export const {updatePlayer, removePlayer, addPlayer} = partySlice.actions

export const selectPartyLEvels = (state: RootState) => {
    Object.keys(state.party.players)
}

export const selectPartyPlayers = (state: RootState) => state.party.players

export const selectParty = (state: RootState) => state.party

export const selectPartyPlayersLevels = (state: RootState) => state.party.players.map(player => player.level)

export default partySlice.reducer