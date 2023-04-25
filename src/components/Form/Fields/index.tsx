import React from 'react'
import { EncounterField } from '../../../types/EncounterForm'
import Text from './Text'
import Select from './Select'

type Props = {
    field: EncounterField,
    onChange: Function
}

const types = {
    input: Text,
    select: Select
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