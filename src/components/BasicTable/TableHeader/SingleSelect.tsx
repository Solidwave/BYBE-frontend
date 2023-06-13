import { Icon, MenuItem, Select } from '@mui/material'
import React, { ChangeEventHandler } from 'react'
import { Column } from '../../../types/Column'

type Props = {
    onChange?: Function,
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

                console.log(value);
                

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