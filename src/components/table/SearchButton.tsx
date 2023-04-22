import { IconButton } from '@mui/material'
import React from 'react'
import Search from '@mui/icons-material/Search';

type Props = {
    onClick?: Function
}

function SearchButton({}: Props) {
  return (
    <IconButton sx={{
          background: 'linear-gradient(180deg, #FFDC5E 0%, #FFCF6E 41.15%, #FFB12B 58.33%, #FFA439 100%)',
          border: '1px solid #FFDC5E',
          color: 'white',
          borderRadius: '4px',
          maxWidth: '20px',
          maxHeight: '20px'
    }}>

        <Search sx={{
            fontSize: '8.75px'
        }} />
    </IconButton>
  )
}

export default SearchButton