import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { uniqueId } from "lodash"

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
    initialState: getInitialState(),
    reducers: {
        updatePlayer: (state, action: PayloadAction<Player>) => {
            const {
                payload
            } = action

            const index = state.players.findIndex((item: Player) => item.id == payload.id)

            if (index != -1) {
                state.players[index] = payload
            }

            saveStateLocally(state)

        },
        removePlayer: (state, action: PayloadAction<string>) => {
            const index = state.players.findIndex((item: Player) => item.id == action.payload)

            if (index != -1) {
                state.players.splice(index, 1)
            }

            saveStateLocally(state)
        },
        addPlayer: (state) => {
            state.players.push({ level: 3, id: uniqueId('player')})

            saveStateLocally(state)
        }
    }
})

export const {updatePlayer, removePlayer, addPlayer} = partySlice.actions

export const selectPartyLEvels = (state: RootState) => {
    Object.keys(state.party.players)
}

export const selectPartyPlayers = (state: RootState) => state.party.players

export const selectParty = (state: RootState) => state.party

export const selectPartyPlayersLevels = (state: RootState) => state.party.players.map(player => player.level)

export default partySlice.reducer

function getInitialState(){
    const partyString = localStorage.getItem('party_state')

    let partyState: State = initialState

    if (partyString !== null) {
        try {
            partyState = JSON.parse(partyString)
            return partyState
        } catch (error) {
            console.log('error retrieving local party state')
        }
    }

    return partyState
}

function saveStateLocally(partyState: State){
    localStorage.setItem('party_state', JSON.stringify(partyState))
}
