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
      sx={{
        overflow: 'hidden'
      }}
      multiple
      limitTags={0}
      options={options}
      renderInput={(params) => <TextField variant='filled' {...params} InputProps={{ ...params.InputProps, disableUnderline: true, style: {flexWrap: 'nowrap'},  }}  label={column.label} />}
    />
  )
}

export default SelectHeader