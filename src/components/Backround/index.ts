import { styled } from "@mui/material"


const Background = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.tertiary?.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minHeight: '100vh',
    height: '100%',
    padding: '5rem',
    [theme.breakpoints.down('md')]: {
        padding: 0
    }
    // overflow: 'hidden'
}),
)

export default Background