import React, { useEffect, useState } from 'react'
import { EncounterField } from '../../../types/EncounterForm'
import { Icon, IconButton, Input, TextField, Typography, styled, useTheme } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'

type Props = {
    field: EncounterField,
    onChange: Function
}

// type ArrayFieldState = Number[]

const Root = styled('div')(props => ({
    display: 'flex'
}))

function ArrayField({ field, onChange }: Props) {
    const [values, setValues] = useState([3, 3, 3, 3, 3])

    const theme = useTheme()

    useEffect(() => {
        onChange(field.fieldName, values)
    })


    return (
        <div>
            <Root>
                <Typography sx={{ color: theme.palette.primary.main }}>{field.label}</Typography>
                <Root sx={{
                    marginLeft: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <IconButton onClick={() => {
                        let tmpValues = [...values]
                        tmpValues.pop()
                        setValues(tmpValues)
                    }}>
                        <Remove />
                    </IconButton>
                    <Typography sx={{ color: theme.palette.primary.main, fontSize: 8, textAlign: 'center',verticalAlign:'center', whiteSpace: 'break-spaces', maxWidth: '50px' }} >add/remove value</Typography>
                    <IconButton onClick={() => {
                        let tmpValues = [...values]
                        tmpValues.push(3)
                        setValues(tmpValues)
                    }}>
                        <Add  />
                    </IconButton>
                </Root>
            </Root>
            <Root>
                {values.map((value, index) => (
                    <TextField sx={{
                        marginRight: 1,
                        ":last-child": {
                            marginRight: 0
                        }
                    }} variant='filled' value={value} onChange={(event) => {
                        const {
                            value: tmpValue
                        } = event.target

                        if (Number.isNaN(Number(tmpValue))) {
                            return
                        }

                        let tmpValues = [...values]

                        tmpValues[index] = Number(event.target.value)
                        setValues(tmpValues)
                    }} />
                ))}
            </Root>
        </div>
    )
}

export default ArrayField

