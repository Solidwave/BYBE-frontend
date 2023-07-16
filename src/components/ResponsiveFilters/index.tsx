import React from 'react'
import { ColumnsType } from '../../types/Column'
import { Grid } from '@mui/material'
import TableHeader from '../BasicTable/TableHeader'
import { useGetAlignmentsListQuery, useGetFamiliesListQuery, useGetRaritiesListQuery, useGetSizesListQuery } from '../../services/creatures'

type PropsType = {
    filters: ColumnsType,
    resetFilters: boolean,
    onChange: (filter: string | string[], value: string | number | string[] | number[] ) => void,
}


const ResponsiveFilters = ({filters, resetFilters, onChange} : PropsType) => {
    const options = {
        families: useGetFamiliesListQuery('').data?.map((family) => ({
          label: family,
          value: family
        })),
        rarities: useGetRaritiesListQuery('').data?.map(rarity => ({
          label: rarity,
          value: rarity
        })),
        alignments: useGetAlignmentsListQuery('').data?.map(alignment => ({
          label: alignment,
          value: alignment
        })),
        sizes: useGetSizesListQuery('').data?.map(size => ({
          label: size,
          value: size
        }))
      }

  return (
    <Grid container spacing={2} sx={{
        padding: '.5rem'
    }}>
        {filters.map((filter, index) => (
            <Grid key={filter.value} item xs={filter.grid}>
                <TableHeader column={filter} resetFilters={resetFilters} onChange={onChange} options={typeof filter.options === 'string' ? options[filter.options as keyof typeof options] : filter.options} />
            </Grid>
        ))}
    </Grid>
  )
}

export default ResponsiveFilters