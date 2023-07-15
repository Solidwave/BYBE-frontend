import React, { useEffect, useState } from 'react'
import { useGetCreaturesListQuery } from '../../services/creatures'
import { FiltersType } from '../BasicTable'
import { Creature } from '../../types/Creature'
import Container from '../Container'
import { Box, Button, ButtonBase, Card, CardContent, Collapse, Typography } from '@mui/material'
import { ArrowDownward, ArrowUpward, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import ResponsiveFilters from '../ResponsiveFilters'
import { columns } from '../BasicTable/config'

const page_size = 50

type PropsType = {
  onRowClick?: (creature: Creature) => void
}
const MobileList = ({onRowClick}: PropsType) =>  {
  
  const [cursor, setCursor] = useState(0)

  const [order, setOrder] = useState<string>('ASCENDING')

  const [sortField, setSortField] = useState<string>('ID')

  const [filters, setFilters] = useState<FiltersType>({})

  const [resetFilters, setResetFilters] = useState(false)

  const { data, isLoading, isFetching, isError } = useGetCreaturesListQuery({ cursor, order,sort_field: sortField, page_size, ...filters })

  console.log(data);
  

  const [localData, setLocalData] = useState<Creature[]>(data?.results || [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [anchorElHide, setAnchorElHide] = useState<null | HTMLElement>(null);

  const hideOpen = Boolean(anchorElHide);({ cursor, order,sort_field: sortField, page_size, ...filters })

  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
      if (cursor != 0 ) {
          setLocalData([...localData, ...data?.results || []])
      } else {
          setLocalData(data?.results || [])
      }
  }, [order, filters, data])


  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 1px',
      padding: '.5rem'
    }}>
      <Container height='auto' width='auto' margin='1rem 0' sx={{
        border: '2px solid',
        borderRadius: '.5rem',
        boxShadow: 5,
        borderColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column'
      }} >
        <Button sx={{
          marginLeft: 'auto'
        }} fullWidth={false} onClick={() => setFiltersOpen(!filtersOpen)} endIcon={!filtersOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}>
          Filters
        </Button>
        <Collapse in={filtersOpen}>
          <ResponsiveFilters filters={columns} />
        </Collapse>
      </Container>
      <div style={{
        height: '100%',
        overflow: 'auto',
        flex: '1 1 1px'
      }}>
        {localData.map((creature, index) => <Card sx={{
          margin: '1rem 1px',
          boxShadow: 2
        }} key={creature.id}>
          <ButtonBase onClick={() => {
            onRowClick(creature)
          }} sx={{
            width: '100%',
            justifyContent: 'start'
          }}>
            <CardContent>
              <Typography sx={{
                textAlign: 'start'
              }}>{creature.name}</Typography>
              <Box sx={{
                display: 'flex',
              }}>
                <Typography>lv: {creature.level}</Typography>
                <Typography>family {creature.family}</Typography>
              </Box>
            </CardContent>
          </ButtonBase>
        </Card>)}
      </div>
    </Container>
  )
}


export default MobileList
