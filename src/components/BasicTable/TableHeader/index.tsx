import React from 'react'
import Empty from './Empty'
import InputHeader from './InputHeader'
import SelectHeader from './SelectHeader'
import Text from './Text'
import { Column } from '../../../types/Column'
import Multi from './Multi'
import SingleSelect from './SingleSelect'

type Props = {
    column: Column,
    options?: {
        label: string,
        value: string
    }[],
    onChange: Function,
    padding?: string
}

const types = {
    singleSelect: SingleSelect,
    input: InputHeader,
    select: SelectHeader,
    text: Text,
    double: Multi
}

function TableHeader({column,options, onChange}: Props) {
    const TmpItem = types[column.type as keyof typeof types]
    
    return (
        <React.Fragment>
            <TmpItem options={options} onChange={onChange} column={column} />
        </React.Fragment>
    )
}

export default TableHeader