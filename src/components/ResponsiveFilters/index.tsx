import React from 'react'
import { ColumnsType } from '../../types/Column'
import { Grid } from '@mui/material'
import TableHeader from '../BasicTable/TableHeader'

type PropsType = {
    filters: ColumnsType
}


const ResponsiveFilters = ({filters} : PropsType) => {
  return (
    <Grid container spacing={2} sx={{
        padding: '.5rem'
    }}>
        {filters.map((filter, index) => (
            <Grid key={filter.value} item xs={filter.grid}>
                <TableHeader column={filter} resetFilters={false} onChange={function (filter: string | string[], value: string | number | string[] | number[]): void {
                    console.log('Function not implemented.')
                } } />
            </Grid>
        ))}
    </Grid>
  )
}

export default ResponsiveFilters