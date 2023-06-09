import React, { useEffect, useState } from 'react'
import { Creature } from '../../types/Creature'
import CreatureCard from '../../components/CreatureCard'
import { Typography, styled } from '@mui/material'
import Header from '../../components/Header'
import { useLazyGetEncounterInfoQuery } from '../../services/encounter'
import { selectPartyPlayersLevels } from '../../slices/partySlice'
import { useDispatch, useSelector } from 'react-redux'
import usePrevious from '../../app/hooks'
import { isEqual } from 'lodash'
import { setEncounterInfo } from '../../slices/encounterinfoslice'

type Props = {
    creatures: Creature[]
    removeCreature: (index: number) => void
    removeAll: () => void
    updateCreature: (creature: Creature, index: number) => void
}

const Root = styled('div')(() => ({
    width: '100%',
    padding: 10
}))
const ListContainer = styled('div')(() => ({
    width: '100%',
    maxHeight: 'calc(100vh - 400px)',
    overflowY: 'auto',
    padding: '0px .5rem'
}))

const CreaturesList = ({ creatures, removeCreature, removeAll, updateCreature }: Props) => {
    const dispatch = useDispatch()

    const [encounterInfo, {data}] = useLazyGetEncounterInfoQuery()

    const [experience, setExperience] = useState<number>(0)

    const [difficulty, setDifficulty] = useState<string>('')

    const [creaturesLevels, setCreatureLevels] = useState<number[]>([])

    const party_levels = useSelector(selectPartyPlayersLevels)

    const prev_party_levels = usePrevious(party_levels)

    useEffect(() => {
       setExperience(data?.experience || 0) 

       setDifficulty(data?.difficulty || '')

       dispatch(setEncounterInfo({experience: data?.experience, difficulty: data?.difficulty}))
    }, [data])

    useEffect(() => {
        if (creaturesLevels.length > 0) {
            encounterInfo({ party_levels, enemy_levels: creaturesLevels })
        } else {
            setExperience(0)
            setDifficulty('')
            dispatch(setEncounterInfo({experience: 0, difficulty: 'trivial'}))
        }
    }, [creaturesLevels])

    useEffect(() => {
      if (!isEqual(prev_party_levels,party_levels) && creaturesLevels.length > 0) {
        encounterInfo({ party_levels, enemy_levels: creaturesLevels })
      }
    }, [party_levels])


    useEffect(() => {
        const tempLevels : number[] = []

        creatures.forEach(creature => {
            const quantity = typeof creature.quantity === 'number' ? creature.quantity : 1

            for (let index = 0; index < quantity; index++) {
                tempLevels.push(creature.level)
            }
        })

        setCreatureLevels(tempLevels)
    }, [creatures])

    return (
        //TODO rendere textfield uguali
        <Root >
            <Header action={{callback: removeAll, text: 'Clear'}} text='Encounter experience' subtitle={difficulty !== '' ? `Difficulty: ${difficulty}` : ''} cost={experience}></Header>
            {creatures.length === 0 && <Typography textAlign='center'>Click a creature in the table to add it here! Or generate a random encounter by clicking on &quot;ENCOUNTER BUILDER&quot;</Typography>}
            <ListContainer>
                {creatures.map((creature, index) => (
                    <CreatureCard updateCreature={updateCreature} key={index}  index={index} removeCreature={removeCreature} creature={creature}></CreatureCard>
                ))}
            </ListContainer>
        </Root>
    )
}

export default CreaturesList