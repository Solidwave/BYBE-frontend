import { TextField } from '@mui/material'
import React from 'react'
import { Column } from '../../../types/Column'
import { uniqueId } from 'lodash'

type Props = {
  column: Column,
  onChange?: (filter: string, value: string) => void,
  resetFilters: boolean
}

function InputHeader({column, onChange, resetFilters}: Props) {
  return (
    <TextField key={resetFilters ? uniqueId('input') : column.value + '_input'} onChange={(e) => {
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