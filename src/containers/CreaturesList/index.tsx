import React, { ChangeEvent, useEffect, useState } from 'react'
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


    return (
        //TODO rendere textfield uguali
        <Root >
            <Header text='Total encounter cost:' cost={180}></Header>
            {creatures.map(creature => (
                <CreatureCard creature={creature}></CreatureCard>
            ))}
        </Root>
    )
}

export default CreaturesList