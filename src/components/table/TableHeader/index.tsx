import React from 'react'
import Empty from './Empty'
import InputHeader from './InputHeader'
import SelectHeader from './SelectHeader'
import Text from './Text'
import { Column, ColumnType } from '../../../types/column'
import Multi from './Multi'

type Props = {
    column: Column,
    options?: {
        label: string,
        value: string
    }[],
    padding?: string
}

const types = {
    empty: Empty,
    input: InputHeader,
    select: SelectHeader,
    text: Text,
    double: Multi
}

function TableHeader({column,options}: Props) {
    const TmpItem = types[column.type as keyof typeof types]
    
    return (
        <React.Fragment>
            <TmpItem options={options} column={column} />
        </React.Fragment>
    )
}

export default TableHeader