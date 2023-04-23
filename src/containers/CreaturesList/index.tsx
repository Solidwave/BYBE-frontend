import React, { ChangeEvent, useState } from 'react'
import { Creature } from '../../types/creature'
import CreatureCard from '../../components/CreatureCard'
import { Button, TextField, styled } from '@mui/material'
import Header from '../../components/header'

type Props = {
    creatures: Creature[]
}

const Root = styled('div')(props => ({
    width: '100%',
    padding: 10,
    boxSizing: 'border-box'
}))

const CreaturesList = (props: Props) => {
    const { creatures } = props

    const [partyLevel, setPartyLevl] = useState(1)
    const [partySize, setPartySize] = useState(5)

    

    const handleChangePartySize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (Number.isNaN(Number(value))) {
            event.preventDefault()
            return
        }

        setPartySize(Number(value))
    }

    const handleChangePartyLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (Number.isNaN(Number(value))) {
            event.preventDefault()
            return
        }
        setPartyLevl(Number(value))
    }


    return (
        //TODO rendere textfield uguali
        <Root >
            <div style={{
                display: 'flex'
            }}>
                <TextField sx={{
                    marginRight: '5px',
                    marginBottom: '1rem'
                }} fullWidth  variant='filled' value={partySize} onChange={handleChangePartySize} label='Party size' InputProps={{
                    disableUnderline: true
                }}></TextField>
                <TextField fullWidth variant='filled' value={partyLevel} onChange={handleChangePartyLevel} label='Party level' InputProps={{
                    disableUnderline: true
                }}></TextField>
            </div>
            <Button sx={{
                marginBottom: 5
            }} color='primary' fullWidth variant='contained'> Generate encounter</Button>
            <Header text='Total encounter cost:' cost={180}></Header>
            {creatures.map(creature => (
                <CreatureCard creature={creature}></CreatureCard>
            ))}
        </Root>
    )
}

export default CreaturesList