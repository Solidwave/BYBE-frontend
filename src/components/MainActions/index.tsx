import { styled } from '@mui/material'
import React from 'react'
import Action from './Action'

type Props = {}

export type ActionType = {
    type: string,
    label: string
}

const Root = styled('div')(props => ({
    boxSizing:'border-box',
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

const actions : ActionType[] = [
    {
        type: 'encounter_builder',
        label: 'ENCOUNTER BUILDER'
    },
    {
        type: 'encounter_builder',
        label: 'ENCOUNTER BUILDER'
    },
    {
        type: 'encounter_builder',
        label: 'ENCOUNTER BUILDER'
    },
    {
        type: 'encounter_builder',
        label: 'ENCOUNTER BUILDER'
    }
]

function MainActions({}: Props) {
  return (
    <Root>{actions.map((action, index) => (
        <Action key={index} action={action} />
    ))}</Root>
  )
}

export default MainActions