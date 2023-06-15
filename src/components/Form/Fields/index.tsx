import React from 'react'
import { EncounterField } from '../../../types/EncounterForm'
import Text from './Text'
import Select from './Select'
import ArrayField from './ArrayField'

type Props = {
    field: EncounterField,
    onChange: (name: string, value: string | number | number[] | undefined) => void
}

const types = {
    input: Text,
    select: Select,
    array: ArrayField
}

function Field({ field, onChange }: Props) {
    const TmpItem = types[field.type]

    return (
        <div style={{
            margin: '1rem 0'
        }}>
            <TmpItem onChange={onChange} field={field} />
        </div>
    )
}

export default Field