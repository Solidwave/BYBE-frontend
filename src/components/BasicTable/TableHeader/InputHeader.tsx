import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Column } from '../../../types/Column'
import { uniqueId } from 'lodash'

type Props = {
  column: Column,
  onChange?: (filter: string, value: string) => void,
  resetFilters: boolean
}

function InputHeader({column, onChange, resetFilters}: Props) {
  const nameFilter = column.value + '_filter'

  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onChange(nameFilter, searchTerm)
    }, 500)
    return () => clearTimeout(delaySearch)
  }, [searchTerm])

  return (
    <TextField key={resetFilters ? uniqueId('input') : column.value + '_input'} onChange={(e) => {
      const { value } = e.target

      setSearchTerm(value)
    }} variant='filled' InputProps={{
      disableUnderline: true
    }} disabled={column.disabled}  fullWidth label={column.label} placeholder={column.label}></TextField>
  )
}

export default InputHeader