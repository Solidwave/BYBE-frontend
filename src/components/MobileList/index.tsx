import React, { useEffect, useState } from 'react'
import {  useGetCreaturesListQuery } from '../../services/creatures'
import { FiltersType } from '../BasicTable'
import { Creature } from '../../types/Creature'
import Container from '../Container'
import { Box, Button, ButtonBase, Card, CardContent, Collapse, IconButton, Menu, MenuItem, Skeleton, Typography, useTheme } from '@mui/material'
import {  KeyboardArrowDown, Sort, Close, ImportExport} from '@mui/icons-material'
import ResponsiveFilters from '../ResponsiveFilters'
import { columns, orderOptions } from '../BasicTable/config'
import { isArray, isEmpty, uniqueId } from 'lodash'
import { useInView } from 'react-intersection-observer'


const page_size = 50

type PropsType = {
  onRowClick?: (creature: Creature) => void
}
const MobileList = ({ onRowClick }: PropsType) => {

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setCursor(parseInt(entry?.target.getAttribute('data-cursor') || '0') + 1)
    }
  }, [inView, entry])

  const [cursor, setCursor] = useState(0)

  const [order, setOrder] = useState<string>('ASCENDING')

  const [sortField, setSortField] = useState<string>('ID')

  const [filters, setFilters] = useState<FiltersType>({})

  const [resetFilters, setResetFilters] = useState(false)

  const { data, isLoading, isFetching, isError } = useGetCreaturesListQuery({ cursor, order, sort_field: sortField, page_size, ...filters })

  const [localData, setLocalData] = useState<Creature[]>(data?.results || [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false)
    }
  }, [resetFilters])

  useEffect(() => {
    if (cursor != 0) {
      setLocalData([...localData, ...data?.results || []])
    } else {
      setLocalData(data?.results || [])
    }
  }, [order, filters, data])

  const placeHolder = () => [...Array(page_size).keys()].map(() => (
    <Card sx={{
      margin: '1rem 1px',
      boxShadow: 2
    }}
      key={uniqueId("placeholder-mobile-list")}>
      <CardContent>
        <Skeleton width={'40%'} />
        <Skeleton width={'100%'} />
      </CardContent>
    </Card>
  ))

  useEffect(() => {
    if (cursor != 0) {
      setLocalData([...localData, ...data?.results || []])
    } else {
      setLocalData(data?.results || [])
    }
  }, [order, filters, data])

  const onFilterChange = (filterName: string | string[], value: string | string[] | number | number[]) => {
    const tmpFilters = { ...filters }

    if (isArray(filterName) && isArray(value)) {
      for (let i = 0; i < filterName.length; i++) {
        const tmpFilterName = filterName[i];

        const tmpFilterValue = value[i]

        tmpFilters[tmpFilterName] = tmpFilterValue

      }
    } else if (!isArray(filterName) && !isArray(value)) {
      tmpFilters[filterName] = value
    }

    setCursor(0)

    setFilters(tmpFilters)
  }

  const loading = cursor === 0 && (isLoading || isFetching)

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false)
    }
  }, [resetFilters])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const theme = useTheme()

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
        <Container height='auto' width='auto' sx={{
          display: 'flex'
        }} >
          <IconButton color='primary' onClick={handleClick}>
              <Sort />
          </IconButton>
          <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
              {orderOptions.map(option => (
                  <MenuItem value={option.value} sx={{
                      fontWeight: option.value === sortField ? '700' : 400
                  }} onClick={() => {
                      setCursor(0)
                      setAnchorEl(null)
                      setSortField(option.value || '')
                  }} key={option.value}>{option.label}</MenuItem>
              ))}
          </Menu>
          <IconButton color='primary' onClick={() => {
              if (order === 'ASCENDING') {
                  setOrder('DESCENDING')
              } else {
                  setOrder('ASCENDING')
              }
          }}>
              <ImportExport />
          </IconButton>
          <Button sx={{
            marginLeft: 'auto'
          }} fullWidth={false} onClick={() => setFiltersOpen(!filtersOpen)} endIcon={<KeyboardArrowDown sx={{
            transform: filtersOpen ? 'rotate(-180deg)' : 'none',
            transition: theme.transitions.create(['transform'], {duration: theme.transitions.duration.short})
          }}/>}>
            Filters
          </Button>
          {!isEmpty(filters) && <IconButton color='primary' onClick={() => {
            setCursor(0)
            setFilters({})
            setResetFilters(true)
          }} ><Close /></IconButton>}

        </Container>

        <Collapse in={filtersOpen}>
          <ResponsiveFilters filters={columns} resetFilters={resetFilters} onChange={onFilterChange} />
        </Collapse>

      </Container>
      <div style={{
        height: '100%',
        overflow: 'auto',
        flex: '1 1 1px'
      }}>
        {loading ? placeHolder() : localData.map((creature, index) => {
          const cursor = index + 1

          const last = localData.length >= (page_size - 1) && index === localData.length - 1

          return <Card
            ref={last ? ref : null}
            data-cursor={cursor}
            sx={{
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
               
                <Box sx={{
                  display: 'flex',
                }}>
                  <Typography mr={theme.spacing(1)}  fontSize={'small'}>lv {creature.level}</Typography>
                  <Typography mr={theme.spacing(1)}  fontSize={'small'}>{creature.family}</Typography>
                  <Typography mr={theme.spacing(1)}  fontSize={'small'}>{creature.alignment}</Typography>
                  <Typography mr={theme.spacing(1)}  fontSize={'small'}>{creature.size}</Typography>
                  <Typography mr={theme.spacing(1)}  fontSize={'small'}>{creature.hp} HP</Typography>
                </Box>
                <Typography fontWeight={600} sx={{
                  textAlign: 'start'
                }}>{creature.name}</Typography>
              </CardContent>
            </ButtonBase>
          </Card>
        })}
        {!loading && data?.next && placeHolder()}
        {isError && <Typography>Sorry! Something went wrong while trying get all the creatures! Try again later..</Typography>}
      </div>
    </Container>
  )
}


export default MobileList
