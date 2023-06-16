import { styled } from '@mui/material'
import React from 'react'
import Action from './Action'
import { ActionType } from '../../types/MainActions'

type Props = {
    handleAction: Function
}



const Root = styled('div')(props => ({
    boxSizing: 'border-box',
    height: '72px',
    width: 'fit-content',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    right: 0,
    left: 0,
    top: -45,
    borderRadius: 32,
    border: `5px solid ${props.theme.palette.secondary.main}`,
    background: props.theme.palette.secondary.dark
}))

const actions: ActionType[] = [
    {
        type: 'encounter_builder',
        label: 'ENCOUNTER BUILDER'
    },
    {
        type: 'party_builder',
        label: 'PARTY BUILDER'
    }
]

function MainActions({ handleAction }: Props) {
    return (
        <Root>{actions.map((action, index) => (
            <Action handleAction={handleAction} key={index} action={action} />
        ))}</Root>
    )
}

export default MainActions