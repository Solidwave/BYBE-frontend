import React, { useEffect, useState } from 'react'
import { Creature } from '../../types/creature'
import CreatureCard from '../../components/CreatureCard'
import { styled } from '@mui/material'
import Header from '../../components/header'
import { useLazyGetEncounterInfoQuery } from '../../services/encounter'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'

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

        
function getCreaturesLevels(creatures: Creature[]): number[] {
    return creatures.map(creature => creature.level)
}

const CreaturesList = ({ creatures, removeCreature }: Props) => {
    const [encounterInfo, {data, isLoading}] = useLazyGetEncounterInfoQuery()
    const [experience, setExperience] = useState<number>(0)
    const [difficulty, setDifficulty] = useState<string>('')

    const party_levels = useAppSelector((state : RootState) => state.party.party_levels)
    const enemy_levels = getCreaturesLevels(creatures)
    useEffect(() => {
       setExperience(data?.experience || 0) 
       setDifficulty(data?.difficulty || '')
    }, [data])

    useEffect(() => {
        if (creatures && creatures.length > 0) {
            encounterInfo({ party_levels, enemy_levels })
        } else {
            setExperience(0)
            setDifficulty('')
        }
    }, [creatures])

    return (
        //TODO rendere textfield uguali
        <Root >
            <Header text='Encounter experience' subtitle={difficulty !== '' ? `Difficulty: ${difficulty}` : ''} cost={experience}></Header>
            <ListContainer>
                {creatures.map((creature, index) => (
                    <CreatureCard key={index} quantity={1} index={index} removeCreature={removeCreature} creature={creature}></CreatureCard>
                ))}
            </ListContainer>
        </Root>
    )
}

export default CreaturesList