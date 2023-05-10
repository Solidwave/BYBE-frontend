import {  Theme, Typography, styled } from '@mui/material'
import React, { MouseEventHandler } from 'react'

export type Variant = 'elite' | 'weak' | 'normal'

type Props = {
    text?: String,
    value?: number,
    variant?: Variant,
    theme?: Theme,
    selected: boolean,
    onClick: Function & MouseEventHandler<HTMLButtonElement>
}

const getColor = (variant: Variant) => {
    switch (variant) {
        case 'weak':
            return 'trivial'
        case 'elite':
            return 'extreme'
        default:
            return 'trivial'
    }
}

const Root = styled('button')((props: Props) => ({
    borderRadius: 64,
    display: 'flex',
    justifyContent: 'center',
    border: 0,
    width: 'fit-content',
    padding: '0 6.5px',
    opacity: props.selected ? 1 : 0.5,
    alignItems: 'center',
    transition: 'opacity ease-in-out .2s',
    cursor: 'pointer',
    background: props.theme?.palette.badge ? props.theme?.palette.badge[getColor(props.variant || 'weak')]  : '',
    ":hover": {
        opacity: 1
    }
    
}))



function Badge(props: Props) {
    return (
        <Root {...props}  >
            <Typography sx={{
                fontWeight: 500,
                fontSize: '.75rem'
            }}>{props.text}</Typography>
        </Root>
    )
}

export default Badge