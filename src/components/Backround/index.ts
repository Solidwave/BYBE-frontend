import { styled } from "@mui/material"



const Background = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.tertiary?.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    height: '100vh',
    padding: '5rem',
    [theme.breakpoints.down('md')]: {
        padding: 0,
        height: '100%'
    }
    // overflow: 'hidden'
}),
)

export default Background