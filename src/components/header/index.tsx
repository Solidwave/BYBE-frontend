import { Button, Typography, styled } from '@mui/material'
import React from 'react'

type Props = {
  text?: string,
  cost?: number,
  action?: {
    callback: Function,
    text: string
  },
  subtitle?: string
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

function Header({text, cost, subtitle, action}: Props) {
  return (
    <HeaderBackground>
      {action && <Button sx={{
        marginRight: 'auto',
        marginLeft: '1rem',
        marginTop: '5px',
        marginBottom: '5px',
        visibility: 'hidden'
      }} variant='outlined' color='tertiary' >{action.text}</Button>}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography>{text}: {cost}</Typography>
        <Typography>{subtitle}</Typography>
      </div>
      {action && <Button sx={{
        marginLeft: 'auto',
        marginRight: '1rem'
      }} variant='outlined' color='tertiary' onClick={() => {
        action.callback()
      }}>{action.text}</Button>}
    </HeaderBackground>
  )
}

export default Header