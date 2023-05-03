import React, { useEffect, useState } from 'react'
import { Creature } from '../../types/creature'
import { IconButton, TextField, Typography, styled } from '@mui/material'
import { Delete, KeyboardArrowDown, KeyboardArrowUp, Star, StarBorder } from '@mui/icons-material'
import Badge from './Badge'

type Props = {
  creature: Creature,
  quantity: number,
  removeCreature: Function,
  setQuantity: Function,
  index: number
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

function CreatureCard({ creature, removeCreature, index, quantity, setQuantity }: Props) {
  const [count, setCount] = useState(quantity || 1)
  const [fav, setFav] = useState(false)

  useEffect(() => {
    setQuantity(creature,count)
  },[count, setQuantity, creature])

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
        <Badge text={'XP'} value={60}  />
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