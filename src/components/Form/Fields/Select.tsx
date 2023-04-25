import React from 'react'
import { EncounterField } from '../../../types/EncounterForm'
import { Autocomplete, MenuItem, Select as MuiSelect, TextField } from '@mui/material'
import { useGetAlignmentsListQuery, useGetFamiliesListQuery, useGetRaritiesListQuery, useGetSizesListQuery } from '../../../services/creatures'

type Props = {
    field: EncounterField,
    onChange: Function
}

function Select({field, onChange}: Props) {
    const options = {
        'families': useGetFamiliesListQuery('').data?.map(family => ({value: family, label: family})),
        'rarities': useGetRaritiesListQuery('').data?.map(family => ({ value: family, label: family })),
        'sizes': useGetSizesListQuery('').data?.map(family => ({ value: family, label: family })),
        'alignments': useGetAlignmentsListQuery('').data?.map(family => ({ value: family, label: family })),
        
    }

    if (!field.options) return null

    let tmpOptions = typeof field.options === 'string' ? options[field.options] : field.options

    if (!tmpOptions) return null

    return (
        <Autocomplete
            disablePortal
            onChange={(event, value) => {
                onChange(field.fieldName, value?.value)
            }}
            options={tmpOptions}
            renderInput={(params) => <TextField variant='filled' {...params} InputProps={{ ...params.InputProps, disableUnderline: true }} label={field.label} />}
        />
    )
}

export default Select