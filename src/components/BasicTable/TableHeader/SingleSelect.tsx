import { Icon, MenuItem, Select } from '@mui/material'
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


function SingleSelect({ onChange, column, options }: Props) {
    if (!options) {
        return <div></div>
    }

    return (
       <Select
            variant='standard'
            defaultValue={options[0].value}
            >
            {options.map(option =>(
                <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
            ))}
       </Select>
    )
}

export default SingleSelect