import { TextField } from '@mui/material'
import React, { ChangeEventHandler } from 'react'
import { Column } from '../../../types/Column'

type Props = {
  column: Column,
  onChange?: Function
}

function InputHeader({column, onChange}: Props) {
  return (
    <TextField onChange={(e) => {
      const { value } = e.target
      
      if (onChange) {
        onChange(column.value + '_filter', value)
      }
    }} variant='filled' InputProps={{
      disableUnderline: true
    }} disabled={column.disabled}  fullWidth label={column.label} placeholder={column.label}></TextField>
  )
}

export default InputHeader