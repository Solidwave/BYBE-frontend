import React, { useEffect, useState } from 'react'
import { Player} from '../../slices/partySlice'
import { IconButton, TextField } from '@mui/material'
import { Remove } from '@mui/icons-material'

type Props = {
    player: Player,
    index: number,
    updatePlayer: (player: Player) => void,
    removePlayer: (id: string) => void

}

function PlayerEditor({ player, index, updatePlayer, removePlayer }: Props) {
    const [showValue, setShowValue] = useState<number>(player.level)

    useEffect(() => {
        const tmpPlayer = { ...player }

        tmpPlayer.level = Number(showValue)

        updatePlayer(tmpPlayer)
    }, [showValue])

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TextField variant='filled' defaultValue={1} fullWidth label={'Player ' + String(index + 1)} value={showValue} onChange={(e) => {
                const {
                    value
                } = e.target

                if (Number.isNaN(Number(value))) {
                    return
                }

                let finalValue = Number(value)

                if (finalValue > 20) {
                    finalValue = 20
                }

                setShowValue(finalValue)
            }} ></TextField>
            <div>
                <IconButton size='small' sx={{
                    marginLeft: '1rem',
                }} onClick={() => {
                    removePlayer(player.id)
                }}>
                    <Remove/>
                </IconButton>
            </div>
        </div>
    )
}

export default PlayerEditor