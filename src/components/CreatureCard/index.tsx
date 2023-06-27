import React, { useEffect, useState } from 'react'
import { Creature, Variant } from '../../types/Creature'
import { IconButton, TextField, Typography, styled } from '@mui/material'
import { Delete, KeyboardArrowDown, KeyboardArrowUp, Star, StarBorder } from '@mui/icons-material'
import Badge from './Badge'
import { useLazyGetCreatureQuery, useLazyGetEliteQuery, useLazyGetWeakQuery } from '../../services/creatures'

type Props = {
    creature: Creature,
    removeCreature: (index: number) => void,
    index: number,
    updateCreature: (creature: Creature, index: number) => void
}

const Container = styled('div')((props => ({
    display: 'flex',
    alignItems: 'center',
    background: props.theme.palette.tertiary.main,
    fontSize: '.875rem',
    flexDirection: 'row',
    position: 'relative',
    padding: '.5rem 1rem',
    border: ' 1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: props.theme.extraShadows.card,
    p: 10,
    margin: '.5rem 0',
    borderRadius: 16
})))

function CreatureCard({ creature, removeCreature, index, updateCreature }: Props) {
    const [getElite] = useLazyGetEliteQuery()
    const [getWeak] = useLazyGetWeakQuery()
    const [getCreature] = useLazyGetCreatureQuery()
    const [count, setCount] = useState(creature.quantity || 1)
    const [fav, setFav] = useState(false)
    const [forceVariant, setForceVariant] = useState<Variant>(creature.variant)


    const handleBadgeClick = (badge: Variant) => {
        setForceVariant(badge)

        switch (badge) {
            case 'elite':
                getElite(creature.id).then((res) => {
                    updateCreature(res.data.results, index)
                })
                break;
            case 'weak':
                getWeak(creature.id).then((res) => {
                    updateCreature(res.data.results, index)
                })
                break;
            default:
                getCreature(creature.id).then((res) => {
                    updateCreature(res.data.results, index)
                })
                break;
        }
    }

    // useEffect(() => {
        
    //     if (eliteData) {
    //         updateCreature(eliteData.results, index)
    //     }
    // }, [eliteData])

    // useEffect(() => {
    //     if (creatureData) {
    //         updateCreature(creatureData.results, index)
    //     }
    // }, [creatureData])

    // useEffect(() => {
    //     if (weakData) {
    //         updateCreature(weakData.results, index)
    //     }
    // }, [weakData])

    useEffect(() => {
        updateCreature({ ...creature, quantity: count }, index)
    }, [count])

    const increaseCount = () => {
        setCount(count + 1)
    }

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (Number.isNaN(Number(value))) {
            event.preventDefault()
            return
        }

        setCount(Number(value))
    }



    return (
        <Container>
            <IconButton disableRipple sx={{
                position: 'absolute',
                top: -10,
                right: 0
            }}
                onClick={() => {
                    removeCreature(index)
                }}>
                <Delete></Delete>
            </IconButton>
            <TextField value={count} InputProps={{
                disableUnderline: true,
                fullWidth: false
            }}
                onChange={handleChange}
                inputProps={{ style: { verticalAlign: 'center', padding: 12, textAlign: 'right' } }}
                sx={{
                    justifySelf: 'flex-start',
                    width: 50,
                    minWidth: 50,
                    marginRight: '1rem'
                }} variant='filled'></TextField>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifySelf: 'center'
            }}>
                <Typography fontSize={14}>{creature.name} ({creature.family}) Lv: {creature.level}</Typography>
                <div style={{
                    display: 'flex'
                }}>
                    <Badge onClick={() => {
                        if (creature.variant === 'weak') {
                            handleBadgeClick('normal')
                        } else {
                            handleBadgeClick('weak')
                        }
                    }} text={'Weak'} selected={forceVariant ==='weak' } variant='weak' />
                    <Badge onClick={() => {
                        if (creature.variant === 'elite') {
                            handleBadgeClick('normal')
                        } else {
                            handleBadgeClick('elite')
                        }
                    }} text={'Elite'} selected={forceVariant === 'elite'} variant='elite' />
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifySelf: 'flex-end',
                marginLeft: 'auto'
            }}>
                <IconButton sx={{
                    fontSize: '1rem'
                }} onClick={() => { decreaseCount() }}><KeyboardArrowDown /></IconButton>
                <IconButton onClick={() => {
                    setFav(!fav)
                }}>{fav ? <Star /> : <StarBorder />}</IconButton>
                <IconButton onClick={() => { increaseCount() }}><KeyboardArrowUp /></IconButton>
            </div>

        </Container>
    )
}

export default CreatureCard