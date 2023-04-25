import React from 'react'
import { ActionType } from '.'
import { Button, styled } from '@mui/material'

type Props = {
    action: ActionType,
    handleAction: Function
}

function Action({action, handleAction}: Props) {
  return (
    <Button sx={{
          boxSizing: 'border-box',
          minHeight: 40,
          marginRight: '.5rem',
          ":last-child": {
            marginRight: 0
          }
    }} onClick={() => {handleAction(action)}} variant='action'>{action.label}</Button>
  )
}

export default Action