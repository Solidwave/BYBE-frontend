import { Button, IconButton, Typography, styled } from '@mui/material'
import React from 'react'

type Props = {
  text?: string,
  cost?: number,
  action?: {
    callback: () => void,
    text?: string,
    icon?: React.ElementType
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

const CustomIconButton = styled(IconButton)(
  props => ({
    color: props.theme.palette.tertiary.main,
    ':hover': {
      color: props.theme.palette.tertiary.main,
    }
  })
)

function Header({text, cost, subtitle, action}: Props) {
  return (
    <HeaderBackground>
     {action && (action.icon ? <CustomIconButton sx={{
        marginRight: 'auto',
        visibility: 'hidden',
      }}  >
        <action.icon/>
      </CustomIconButton>  : 
        <Button sx={{
          marginRight: 'auto',
          visibility: 'hidden'
        }} variant='outlined' color='tertiary'>{action.text}
        </Button>)}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography>{text}: {cost}</Typography>
        <Typography>{subtitle}</Typography>
      </div>
      {action && (action.icon ? <CustomIconButton sx={{
        marginLeft: 'auto'
      }}  onClick={action.callback}>
        <action.icon/>
      </CustomIconButton>  : 
        <Button sx={{
          marginLeft: 'auto',
        }}  color='tertiary' onClick={() => {
          action.callback()
        }}>{action.text}
        </Button>)}
    </HeaderBackground>
  )
}

export default Header