import { TextField } from '@mui/material'
import React, { ChangeEventHandler } from 'react'
import { Column } from '../../../types/column'

type Props = {
  column: Column,
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

function InputHeader({column, onChange}: Props) {
  return (
    <TextField variant='filled' InputProps={{
      disableUnderline: true
    }}  fullWidth label={column.label} placeholder={column.label} onChange={onChange}></TextField>
  )
}

export default InputHeader