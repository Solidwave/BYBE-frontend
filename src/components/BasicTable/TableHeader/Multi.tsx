import React from 'react'
import { Column } from '../../../types/Column'
import TableHeader from '.'
import { styled } from '@mui/material'

type Props = {
    column: Column,
    padding?: string,
    resetFilters: boolean,
    onChange: (filter: string, value: string) => void
}

const Root = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row'
}))

const HeaderContainer = styled('div')(() => ({
    ":last-child": {
        paddingLeft: '3px'
    }
}))

function Multi({ column, onChange, resetFilters }: Props) {
    if (!column.subColumns) {
        return <div></div>
    }
    return (
        <Root>
            {column.subColumns?.map((subColumn, index) => (
                <HeaderContainer key={index} >
                    <TableHeader resetFilters={resetFilters} onChange={onChange} column={subColumn}></TableHeader>
                </HeaderContainer>
            ))}
        </Root>
    )
}

export default Multi