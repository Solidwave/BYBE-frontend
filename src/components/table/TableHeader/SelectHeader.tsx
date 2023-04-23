import { Autocomplete, FilledInputProps, TextField } from '@mui/material'
import React, { ChangeEventHandler } from 'react'
import { Column } from '../../../types/column'

type Props = {
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined,
  column: Column,
  options?: {
    label: string,
    value: string
  }[]
}


function SelectHeader({onChange, column,options}: Props) {
  if (!options) {
    return <div></div>
  }

  return (
    <Autocomplete
      disablePortal
      multiple
      limitTags={0}
      options={options}
      renderInput={(params) => <TextField variant='filled' {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}  label={column.label} />}
    />
  )
}

export default SelectHeader