import React, { useEffect, useState } from 'react'
import { useGetCreaturesListQuery } from '../../services/creatures'
import { FiltersType } from '../BasicTable'
import { Creature } from '../../types/Creature'
import Container from '../Container'
import { Box, ButtonBase, Card, CardContent, Typography } from '@mui/material'

const page_size = 50


function MobileList(props) {
  
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

  useEffect(() => {
      if (cursor != 0 ) {
          setLocalData([...localData, ...data?.results || []])
      } else {
          setLocalData(data?.results || [])
      }
  }, [order, filters, data])


  return (
    <div style={{
      height: '100%',
      flexGrow: 1,
      overflow: 'auto',
    }}>
     
      {localData.map((creature, index) => <Card sx={{
        margin: '.5rem'
      }} key={creature.id}>
        <ButtonBase sx={{
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
  )
}


export default MobileList
