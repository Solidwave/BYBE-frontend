import React from 'react'
import { Button } from '@mui/material'
import { ActionType } from '../../types/MainActions'

type Props = {
    action: ActionType,
    handleAction: Function
}

function Action({action, handleAction}: Props) {
  return (
    <Button sx={{
          boxSizing: 'border-box',
          minHeight: 40,
          minWidth: 200,
          marginRight: '.5rem',
          ":last-child": {
            marginRight: 0
          }
    }} onClick={() => {handleAction(action)}} variant='action'>{action.label}</Button>
  )
}

export default Action