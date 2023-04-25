import React from 'react'
import { ActionType } from '.'
import { Button, styled } from '@mui/material'

type Props = {
    action: ActionType
}

function Action({action}: Props) {
  return (
    <Button sx={{
          boxSizing: 'border-box',
          minHeight: 40,
          marginRight: '.5rem',
          ":last-child": {
            marginRight: 0
          }
    }} variant='action'>{action.label}</Button>
  )
}

export default Action