import {  MenuItem, Select } from '@mui/material'
import React from 'react'
import { Column } from '../../../types/Column'

type Props = {
    onChange?: (filter: string, value: string) => void,
    column: Column,
    options?: {
        label: string,
        value: string
    }[]
}


function SingleSelect({ onChange, column, options }: Props) {
    if (!options) {
        return <div></div>
    }

    return (
       <Select
            variant='standard'
            onChange={(e) => {
                const {
                    value
                } = e.target

                onChange(column.value + '_filter',value)
            }}
            defaultValue={options[0].value}
            >
            {options.map(option =>(
                <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
            ))}
       </Select>
    )
}

export default SingleSelect