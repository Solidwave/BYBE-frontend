import React, { useEffect, useState } from 'react'
import { Creature } from '../../types/creature'
import { IconButton, TextField, Typography, styled } from '@mui/material'
import { Delete, KeyboardArrowDown, KeyboardArrowUp, Star, StarBorder } from '@mui/icons-material'
import Badge, { Variant } from './Badge'
import { useLazyGetEliteQuery, useLazyGetWeakQuery } from '../../services/creatures'

type Props = {
  creature: Creature,
  quantity: number,
  removeCreature: Function,
  setQuantity: Function,
  index: number,
  setCreature: Function
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

export type VariantMap = {
  weak?: Creature,
  normal?: Creature,
  elite?: Creature
}

function CreatureCard({ creature, removeCreature, index, quantity, setQuantity, setCreature }: Props) {
  const [getElite, { data: eliteData }] = useLazyGetEliteQuery()
  const [getWeak, { data: weakData }] = useLazyGetWeakQuery()
  const [count, setCount] = useState(quantity || 1)
  const [fav, setFav] = useState(false)
  const [variant, setVariant] = useState<Variant>('normal')
  const [variantMap, setVariantMap] = useState<VariantMap>({normal: creature})


  useEffect(() => {
    switch (variant) {
      case 'elite':
        if (!variantMap.elite) {
          getElite(creature.id)
        } else {
          setCreature(variantMap.elite, index)
        }
        break;
      case 'weak':
        if (!variantMap.weak) {
          getWeak(creature.id)
        } else {
          setCreature(variantMap.weak, index)
        }
        break;
      default:
        setCreature(variantMap.normal, index)
        break;
    }
  },[variant])

  useEffect(() => {
    if (eliteData) {
      setVariantMap({...variantMap, elite: eliteData.results})
    }
  },[eliteData])

  useEffect(() => {
    if (weakData) {
      setVariantMap({ ...variantMap, weak: weakData.results })
    }
  }, [weakData])

  useEffect(() => {
    setQuantity(creature,count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[count])

  const increaseCount = () => {
    setCount(count + 1)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (Number.isNaN(Number(value))) {
      event.preventDefault()
      return
    }

    setCount(Number(value))
  }
  const decreaseCount = () => {
    setCount(count - 1)
  }

  return (
    <Container>
      <IconButton sx={{
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
        inputProps={{style: { verticalAlign: 'center', padding: 12, textAlign: 'right'} }}
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
        <Typography fontSize={14}>{creature.name} ({creature.family})</Typography>
        <div style={{
          display: 'flex'
        }}>
          <Badge onClick = {() => {
            if (variant === 'weak') {
              setVariant('normal')
            } else {
              setVariant('weak')
            }
          }} text={'Weak'} selected={variant === 'weak'} variant='weak' />
          <Badge onClick={() => {
            if (variant === 'elite') {
              setVariant('normal')
            } else {
              setVariant('elite')
            }
          }} text={'Elite'} selected={variant === 'elite'} variant='elite'/>
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
        }}>{fav ? <Star /> : <StarBorder/>}</IconButton>
        <IconButton onClick={() => { increaseCount() }}><KeyboardArrowUp /></IconButton>
      </div>

    </Container>
  )
}

export default CreatureCard