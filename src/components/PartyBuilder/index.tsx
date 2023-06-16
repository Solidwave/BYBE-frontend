import { IconButton, Paper, TextField, styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { addPlayer, selectParty, updatePlayer } from '../../slices/partySlice'
import { useAppDispatch } from '../../app/hooks'
import Header from '../Header'
import { closeModal } from '../../slices/modal'
import PlayerEditor from './PlayerEditor'
import { Add } from '@mui/icons-material'

type Props = {
}
const PartyBuilder = ({ }: Props) => {
    const party = useSelector(selectParty)

    const dispatch = useAppDispatch()
    return (
        <div>
            <Header text='Party builder' action={{
                callback: () => {
                    dispatch(closeModal())
                },
                text: 'CLOSE'
            }} />
            {party.players.map((player, index) => (
                <div key={player.id} style={{
                    marginTop: '1rem'
                }}>
                   <PlayerEditor player={player} index={index} />
                </div>      
            ))}
            <div>
                <IconButton sx={{
                    marginTop: '1rem'
                }} onClick={() => {
                    dispatch(addPlayer())
                }}>
                    <Add />
                </IconButton>
            </div>
        </div>
    )
}

export default PartyBuilder