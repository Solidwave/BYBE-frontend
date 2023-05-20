import { TextField } from '@mui/material'
import React, { ChangeEventHandler } from 'react'
import { Column } from '../../../types/column'

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
    }}  fullWidth label={column.label} placeholder={column.label}></TextField>
  )
}

export default InputHeader