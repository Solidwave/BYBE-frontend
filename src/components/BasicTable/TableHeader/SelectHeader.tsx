import { Autocomplete, Popper, TextField } from '@mui/material'
import React from 'react'
import { Column } from '../../../types/Column'
import { uniqueId } from 'lodash'

type Props = {
  onChange?: (filter: string, value: string) => void,
  column: Column,
  resetFilters: boolean,
  options?: {
    label: string,
    value: string
  }[]
}


function SelectHeader({onChange, column,options, resetFilters}: Props) {
  return (
    <Autocomplete
      key={resetFilters ? uniqueId('autocomplete') : column.value + '_select'}
      onChange={(e, value) => {
        onChange(column.value + '_filter', value?.value)
      }}
      componentsProps={{popper: { style: { width: 'fit-content', minWidth: '100px'}}}}
      disabled={column.disabled}
      limitTags={0}
      options={options || []}
      renderInput={(params) => <TextField variant='filled' {...params} InputProps={{ ...params.InputProps, disableUnderline: true, style: {flexWrap: 'nowrap'},  }}  label={column.label} />}
    />
  )
}

export default SelectHeader