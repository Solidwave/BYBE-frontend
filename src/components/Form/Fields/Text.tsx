import React from 'react'
import { EncounterField } from '../../../types/EncounterForm'
import { TextField } from '@mui/material'

type Props = {
    field: EncounterField,
    onChange: (name: string, value: string) => void
}

function Text({field, onChange}: Props) {
  return (
    <TextField onChange={(event)=> {
        const {
            value
        } = event.target

        onChange(field.fieldName, value)
    }} label={field.label} fullWidth variant='filled'/>
  )
}

export default Text