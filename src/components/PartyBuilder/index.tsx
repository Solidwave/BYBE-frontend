import { Button, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Player, selectParty, setParty } from '../../slices/partySlice'
import { useAppDispatch } from '../../app/hooks'
import Header from '../Header'
import { closeModal } from '../../slices/modal'
import PlayerEditor from './PlayerEditor'
import { Add, Close } from '@mui/icons-material'
import { uniqueId } from 'lodash'


const PartyBuilder = () => {
    const playerState = useSelector(selectParty).players

    const [players, setPlayers] = useState([])

    const dispatch = useAppDispatch()

    useEffect(() => {
        setPlayers(playerState)
    },[])

    const updatePlayer = (player: Player) => {
        const tmpPlayers = [...players]
        
        const index = tmpPlayers.findIndex((item: Player) => item.id == player.id)

        if (index != -1) {
            tmpPlayers[index] = player
        }

        setPlayers(tmpPlayers)
    }

    const removePlayer = (id: string) => {
        const tmpPlayers = [...players]

        const index = tmpPlayers.findIndex((item: Player) => item.id == id)

        if (index != -1) {
            tmpPlayers.splice(index, 1)
        }

        setPlayers(tmpPlayers)
    }

    const addPlayer = () => {
        const tmpPlayers = [...players]

        tmpPlayers.push({ level: 3, id: uniqueId('player')})

        setPlayers(tmpPlayers)
    }

    return (
        <div>
            <Header text='Party builder' action={{
                callback: () => {
                    dispatch(closeModal())
                },
                text: 'CLOSE',
                icon: Close
            }} />
            {players.map((player, index) => (
                <div key={player.id} style={{
                    marginTop: '1rem'
                }}>
                   <PlayerEditor updatePlayer={updatePlayer} removePlayer={removePlayer} player={player} index={index} />
                </div>      
            ))}
            <div>
                <IconButton sx={{
                    marginTop: '1rem'
                }} onClick={addPlayer}>
                    <Add />
                </IconButton>
            </div>
            <Button fullWidth variant='contained' onClick={() => {
                dispatch(setParty(players))
                dispatch(closeModal())
            }}>Confrim</Button>
        </div>
    )
}

export default PartyBuilder