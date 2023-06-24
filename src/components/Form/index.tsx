import React, {   useState } from 'react'
import {  EncounterForm, FormActionType, ValuesType } from '../../types/EncounterForm'
import Field from './Fields'
import { Button, CircularProgress } from '@mui/material'
import Header from '../Header'
import { useAppDispatch } from '../../app/hooks'
import { closeModal } from '../../slices/modal'
import { Close } from '@mui/icons-material'

type Props = {
    form: EncounterForm,
    modalId?: string,
    onSubmit: (value: ValuesType) => void,
    isSubmitting?: boolean
}


const Form = ({ form, onSubmit, isSubmitting, modalId }: Props) => {
    const {actions, fields} = form
    
    const [values, setValues] = useState<ValuesType>(fields.map(field => ({value: undefined, field})))

    const dispatch = useAppDispatch()

    const action = {
        text: 'close',
        callback: () => dispatch(closeModal()),
        icon: Close
    }

    const handleAction = (action: FormActionType) => {
        switch (action.type) {
            case 'submit':
                onSubmit(values)
                break;
        
            default:
                break;
        }
    }

    const onChange = (fieldName: string, value: number | string | undefined) => {
        const fieldIndex = values.findIndex(field => field.field.fieldName === fieldName)

        const tmpValues = [...values]

        tmpValues[fieldIndex] = { ...values[fieldIndex], value }
        
        setValues(tmpValues)
    }

    const headerExtraProps = modalId ? {
        action: action
    } : {}

    return (
        <div>
            <Header text='Encounter fields' {...headerExtraProps}  />
            {fields.map((field, index) => (
                <Field key={index} onChange={onChange} field={field} />
            ))}
            {actions.map((action, index) => {
                if (action.type === 'submit' && isSubmitting) {
                    return <CircularProgress key={index}  sx={{
                        alignSelf: 'center'
                    }}></CircularProgress>
                }
                
                return (
                    <Button key={index} onClick={() => {
                        handleAction(action)
                    }} fullWidth variant='contained'>{action.label}</Button>
                )
            })}
        </div>
    )
}

export default Form
