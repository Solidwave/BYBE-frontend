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
    return creatures.map(creature => {
        let tmpArray: number[] = []

        for (let index = 0; index < (creature.quantity || 0); index++) {
            tmpArray.push(creature.level)
        }
        return tmpArray
    }).flat()
}

const CreaturesList = ({ creatures, removeCreature }: Props) => {
    const [encounterInfo, {data}] = useLazyGetEncounterInfoQuery()
    const [experience, setExperience] = useState<number>(0)
    const [difficulty, setDifficulty] = useState<string>('')
    const [localCreatures, setLocalCreatures] = useState<Creature[]>([])

    const party_levels = useAppSelector((state : RootState) => state.party.party_levels)
    
    useEffect(() => {
       setExperience(data?.experience || 0) 
       setDifficulty(data?.difficulty || '')
    }, [data])

    useEffect(() => {
        setLocalCreatures(creatures.map(creature => ({...creature, quantity: creature.quantity || 1})))
    }, [creatures])

    useEffect(() => {
        if (localCreatures && localCreatures.length > 0) {
            encounterInfo({ party_levels, enemy_levels: getCreaturesLevels(localCreatures) })
        } else {
            setExperience(0)
            setDifficulty('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCreatures])

    const setQuantity = (creature: Creature, quantity: number) => {
        const index = localCreatures.findIndex(tmpCreature => tmpCreature.id === creature.id)
        
        if (index !== -1) {
            let cloneCreatures = [...localCreatures]

            cloneCreatures[index].quantity = quantity

            setLocalCreatures(cloneCreatures)
        }
    }
    const setCreature = (creature: Creature, index: number) => {
        if (index !== -1) {
            let cloneCreatures = [...localCreatures]
            
            let tmpCreature = { ...creature, quantity: cloneCreatures[index].quantity }

            cloneCreatures[index] = tmpCreature

            setLocalCreatures(cloneCreatures)
        }
    }

    return (
        //TODO rendere textfield uguali
        <Root >
            <Header text='Encounter experience' subtitle={difficulty !== '' ? `Difficulty: ${difficulty}` : ''} cost={experience}></Header>
            <ListContainer>
                {localCreatures.map((creature, index) => (
                    <CreatureCard setCreature={setCreature} key={index} setQuantity={setQuantity} quantity={creature.quantity || 1} index={index} removeCreature={removeCreature} creature={creature}></CreatureCard>
                ))}
            </ListContainer>
        </Root>
    )
}

export default CreaturesList