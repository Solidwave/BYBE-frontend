import React from 'react'
import InputHeader from './InputHeader'
import SelectHeader from './SelectHeader'
import Text from './Text'
import { Column } from '../../../types/Column'
import Multi from './Multi'
import SingleSelect from './SingleSelect'
import SliderHeader from './SliderHeader'

type Props = {
    column: Column,
    options?: {
        label: string,
        value: string
    }[],
    resetFilters: boolean,
    onChange: (filter: string | string[], value: string | number | string[] | number[] ) => void,
    padding?: string
}

const types = {
    singleSelect: SingleSelect,
    input: InputHeader,
    select: SelectHeader,
    text: Text,
    double: Multi,
    slider: SliderHeader
}

function TableHeader({column,options, onChange, resetFilters}: Props) {
    const TmpItem = types[column.type as keyof typeof types]
    
    return (
        <React.Fragment>
            <TmpItem resetFilters={resetFilters} options={options} onChange={onChange} column={column} />
        </React.Fragment>
    )
}

export default TableHeader