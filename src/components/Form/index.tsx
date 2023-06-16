import React, {   useState } from 'react'
import {  EncounterForm, FormActionType, ValuesType } from '../../types/EncounterForm'
import Field from './Fields'
import { Button, CircularProgress, Paper, SxProps } from '@mui/material'
import Header from '../Header'
import { useAppDispatch } from '../../app/hooks'
import { closeModal } from '../../slices/modal'

type Props = {
    form: EncounterForm,
    modalId?: string,
    onSubmit: (value: ValuesType) => void,
    isSubmitting?: boolean
}


const style: SxProps = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: '1rem',
    borderRadius: '1rem'
};



const Form = ({ form, onSubmit, isSubmitting, modalId }: Props) => {
    const {actions, fields} = form
    const [values, setValues] = useState<ValuesType>(fields.map(field => ({value: undefined, field})))

    const dispatch = useAppDispatch()

    const action = {
        text: 'close',
        callback: () => dispatch(closeModal())
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
        <Paper variant='fantasy' sx={style}>
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
        </Paper>
    )
}

export default Form
