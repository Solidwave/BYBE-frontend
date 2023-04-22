import { Autocomplete, TextField } from '@mui/material'
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
      options={options}
      renderInput={(params) => <TextField {...params} label={column.label} />}
    />
  )
}

export default SelectHeader