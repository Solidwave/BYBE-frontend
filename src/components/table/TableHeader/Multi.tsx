import React from 'react'
import { Column } from '../../../types/column'
import TableHeader from '.'
import { styled } from '@mui/material'

type Props = {
    column: Column,
    padding?: string
}

const Root = styled('div')((props) => ({
    display: 'flex',
    flexDirection: 'row'
}))

const HeaderContainer = styled('div')((props) => ({
    ":last-child": {
        paddingLeft: '3px'
    }
}))

function Multi({ column }: Props) {
    if (!column.subColumns) {
        return <div></div>
    }
    return (
        <Root>
            {column.subColumns?.map((subColumn, index) => (
                <HeaderContainer key={index} >
                    <TableHeader column={subColumn}></TableHeader>
                </HeaderContainer>
            ))}
        </Root>
    )
}

export default Multi