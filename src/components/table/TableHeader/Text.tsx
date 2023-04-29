import { Typography } from '@mui/material'
import React from 'react'

type Props = {
  text?: string
}

function Text({text}: Props) {
  return (
    <Typography>{text}</Typography>
  )
}

export default Text