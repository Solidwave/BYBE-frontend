import { Theme, Typography, styled } from '@mui/material'
import React from 'react'

type Props = {
    text?: String,
    value?: number,
    theme?: Theme
}

const getColor = (value: number) => {
    switch (true) {
        case value <= 40:
            return 'trivial'
        case value <= 80:
            return 'low'
        case value <= 120:
            return 'moderate'
        case value <= 160:
            return 'severe'
        default:
            return 'extreme'
    }
}

const Root = styled('div')((props: Props) => ({
    borderRadius: 64,
    display: 'flex',
    justifyContent: 'center',
    width: 'fit-content',
    padding: '0 6.5px',
    alignItems: 'center',
    background: props.theme?.palette.badge ? props.theme?.palette.badge[getColor(props.value || 40)]  : ''
}))



function Badge({text, value }: Props) {
    return (
        <Root >
            <Typography sx={{
                fontWeight: 500,
                fontSize: '.75rem'
            }}>{text} {value}</Typography>
        </Root>
    )
}

export default Badge