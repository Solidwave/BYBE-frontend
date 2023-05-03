import React, {  useEffect, useState } from 'react'
import { EncounterField, EncounterForm, FormActionType } from '../../types/EncounterForm'
import Field from './Fields'
import { Button, Paper, SxProps } from '@mui/material'
import Header from '../header'

type Props = {
    form: EncounterForm,
    onSubmit: Function
}

export type ValuesType = {
    field: EncounterField,
    value: number | string | number[] | undefined
}[]

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4
};



const Form = ({ form, onSubmit }: Props) => {
    const {actions, fields} = form
    const [values, setValues] = useState<ValuesType>(fields.map(field => ({value: undefined, field})))

    // const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        
    })

    const handleAction = (action: FormActionType) => {
        switch (action.type) {
            case 'submit':
                onSubmit(values)
                break;
        
            default:
                break;
        }
    }

    const onChange = (fieldName: String, value: number | string | undefined) => {
        const fieldIndex = values.findIndex(field => field.field.fieldName === fieldName)

        let tmpValues = [...values]

        tmpValues[fieldIndex] = { ...values[fieldIndex], value }
        
        setValues(tmpValues)
    }

    return (
        <Paper variant='fantasy' sx={style}>
            <Header text='Encounter fields' />
            {fields.map((field, index) => (
                <Field key={index} onChange={onChange} field={field} />
            ))}
            {actions.map((action, index) => (
                <Button key={index} onClick={() => {
                    handleAction(action)
                }} fullWidth variant='contained'>{action.label}</Button>
            ))}
        </Paper>
    )
}

export default Form
