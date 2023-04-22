import { Typography, styled } from '@mui/material'
import React from 'react'

type Props = {
  text?: string,
  cost?: number
}

const HeaderBackground = styled('div')(
  (props) => ({
    minHeight: '36px',
    width: '100%',
    background: props.theme.palette.primary.main,
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: props.theme.palette.tertiary.main,
    fontSize: '0.875rem'
    
  }))

function Header({text, cost}: Props) {
  return (
    <HeaderBackground>
      <Typography>{text}: {cost}</Typography>
    </HeaderBackground>
  )
}

export default Header