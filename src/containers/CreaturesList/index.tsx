import React, { ChangeEvent, useEffect, useState } from 'react'
import { Creature } from '../../types/creature'
import CreatureCard from '../../components/CreatureCard'
import { Button, TextField, styled } from '@mui/material'
import Header from '../../components/header'

type Props = {
    creatures: Creature[],
    removeCreature: Function
}

const Root = styled('div')(props => ({
    width: '100%',
    padding: 10
}))
const ListContainer = styled('div')(props => ({
    width: '100%',
    maxHeight: 'calc(100vh - 400px)',
    overflowY: 'auto',
    padding: '0px .5rem'
}))


const CreaturesList = ({ creatures, removeCreature }: Props) => {


    return (
        //TODO rendere textfield uguali
        <Root >
            <Header text='Total encounter cost:' cost={180}></Header>
            <ListContainer>
                {creatures.map((creature, index) => (
                    <CreatureCard key={index} quantity={1} index={index} removeCreature={removeCreature} creature={creature}></CreatureCard>
                ))}
            </ListContainer>
        </Root>
    )
}

export default CreaturesList