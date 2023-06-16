import React, { useEffect, useState } from 'react'
import { Player, removePlayer, updatePlayer } from '../../slices/partySlice'
import { IconButton, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Remove } from '@mui/icons-material'

type Props = {
    player: Player,
    index: number
}

function PlayerEditor({ player, index }: Props) {
    const dispatch = useDispatch()

    const [showValue, setShowValue] = useState<number>(player.level)

    useEffect(() => {
        const tmpPlayer = { ...player }

        tmpPlayer.level = Number(showValue)

        dispatch(updatePlayer(tmpPlayer))
    }, [showValue])
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TextField variant='filled' fullWidth label={'Player ' + String(index + 1)} value={showValue} onChange={(e) => {
                const {
                    value
                } = e.target

                if (Number.isNaN(Number(value))) {
                    return
                }

                setShowValue(Number(value))
            }} ></TextField>
            <div>
                <IconButton size='small' sx={{
                    marginLeft: '1rem',
                }} onClick={() => {
                    dispatch(removePlayer(player.id))
                }}>
                    <Remove></Remove>
                </IconButton>
            </div>
        </div>
    )
}

export default PlayerEditor